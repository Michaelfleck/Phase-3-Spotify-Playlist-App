require 'net/http'
require 'uri'

class ApplicationController < Sinatra::Base

    set :default_content_type, 'application/json'



    get '/test' do
        Net::HTTP.get('example.com', '/index.html')
    end

    get '/callback' do
        puts "asdfasdfjalskdfj"
        puts phone
    end

    get '/userInfo' do
        puts 'something'
        puts params[:access_token]

        @@token = params[:access_token]

        body = retrieveInfo(@@token, "https://api.spotify.com/v1/me")

        spotify_id = body["id"]

        puts body

        # User.create("access_token":params[:access_token], "spotify_id":spotify_id)

        body.to_json
    end

    get '/userTracks' do

      puts @@token

      body = retrieveInfo(@@token, "https://api.spotify.com/v1/me/top/tracks")

      puts body

      userId = User.all.where("")

      body.each do |t|
        Song.create("user_id":)
      end

      body.to_json
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

    

end