class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :access_token
      t.string :spotify_id
      t.string :display_name
      t.string :image
      t.string :spotify_link
    end
  end
end
