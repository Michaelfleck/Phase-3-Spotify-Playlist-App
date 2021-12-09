require 'net/http'
require 'uri'

class ApplicationController < Sinatra::Base

    set :default_content_type, 'application/json'

    get '/test' do
        Net::HTTP.get('example.com', '/index.html')
    end

    get '/callback' do
        "Hello"
    end

    get '/userInfo' do
        puts 'something'
        puts params[:access_token]

        #https://jhawthorn.github.io/curl-to-ruby/
        uri = URI.parse("https://api.spotify.com/v1/me")
        request = Net::HTTP::Get.new(uri)
        request.content_type = "application/json"
        request["Authorization"] = "Bearer #{params[:access_token]}"
        
        req_options = {
          use_ssl: uri.scheme == "https",
        }
        
        response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
          http.request(request)
        end

        body = JSON.parse(response.body)
        spotify_id = body["id"]

        # UserCredential.create("access_token":params[:access_token], "spotify_id":spotify_id)

        body.to_json
    end

    

end