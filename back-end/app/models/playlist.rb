class Playlist < ActiveRecord::Base
    has_many :songs
    # belongs_to :user
    # has_many :playlist_songs
    # has_many :songs, through: :playlist_songs
end 
