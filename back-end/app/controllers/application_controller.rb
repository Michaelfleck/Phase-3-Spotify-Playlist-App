require 'net/http'
require 'uri'

class ApplicationController < Sinatra::Base

    set :default_content_type, 'application/json'

    get '/userInfo' do
        puts 'userInfo'

        @@token = params[:access_token]

        body = retrieveInfo(@@token, "https://api.spotify.com/v1/me")

        spotify_id = body["id"]
        display_name = body["display_name"]
        image = body["images"][0]["url"]
        url = body["external_urls"]["spotify"]



        User.create("access_token":params[:access_token], "spotify_id":spotify_id, "display_name":display_name, "image":image, "spotify_link":url)

        body.to_json
    end

    get '/users' do
        User.all.to_json
    end

    post '/userTracks' do

      # puts 'userTracks'

      body = retrieveInfo(@@token, "https://api.spotify.com/v1/me/top/tracks?limit=30")
      
      currentUserObject = User.where(access_token: @@token)
      currentUserId = currentUserObject[0].id

      body["items"].each do |t|
        Song.create(
        "user_id": currentUserId, 
        "song_name":t["name"],
        "artist_name":t["artists"][0]["name"], 
        "album_name":t["album"]["name"],
        "spotify_uri":t["uri"],
        "is_selected": false
        )
      end
      {}.to_json
    end

    post '/playlist' do
      request.body.rewind
      request_payload = JSON.parse request.body.read
      puts request_payload
      id = request_payload["id"]
      uris = request_payload["uris"]
      resp = postStuff(@@token, "https://api.spotify.com/v1/users/#{id}/playlists", { public: true, name: "My FooBar Blended Playlist" })
      puts resp
      puts postStuff(@@token, "https://api.spotify.com/v1/playlists/#{resp['id']}/tracks", { uris: uris })\
      {}.to_json
    end

    delete '/users' do
      User.destroy_all();
      {}.to_json
    end

    delete '/songs' do
      Song.destroy_all();
      {}.to_json
    end

    get '/songs' do
      songlist = []
      User.all.ids.each do |userId|
        Song.where( "user_id == ?", userId ).limit(30).each do |t|
          songlist << t
        end
      end
      songlist.to_json
    end

    def retrieveInfo (token, spotify_url)

      uri = URI.parse(spotify_url)
      request = Net::HTTP::Get.new(uri)
      request.content_type = "application/json"
      request["Authorization"] = "Bearer #{token}"
      
      req_options = {
        use_ssl: uri.scheme == "https",
      }
      
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      JSON.parse(response.body)
  
    end

    def postStuff (token, spotify_url, body)
      uri = URI.parse(spotify_url)
      request = Net::HTTP::Post.new(uri)
      request.content_type = "application/json"
      request["Authorization"] = "Bearer #{token}"
      request.body = body.to_json
      
      req_options = {
        use_ssl: uri.scheme == "https",
      }
      
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      JSON.parse(response.body)
  
    end
    

end