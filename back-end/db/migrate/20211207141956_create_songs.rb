class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.integer :user_id
      t.integer :playlist_id
      t.string :song_name
      t.string :artist_name
      t.string :album_name
      t.string :genre_id
    end
  end
end
