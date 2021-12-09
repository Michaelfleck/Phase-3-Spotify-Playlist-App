class Song < ActiveRecord::Base
    belongs_to :user
    belongs_to :playlist
    # has_many :playlist_songs
    # has_many :playlists, through: :playlist_songs
end 
