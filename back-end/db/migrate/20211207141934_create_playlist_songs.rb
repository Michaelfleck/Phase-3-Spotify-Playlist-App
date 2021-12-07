class CreatePlaylistSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :create_playlist_songs do |t|
      t.integer :songs_id
      t.integer :playlist_id 
    end
  end
end
