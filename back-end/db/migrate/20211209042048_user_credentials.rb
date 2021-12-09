class UserCredentials < ActiveRecord::Migration[6.1]
  def change
    create_table :user_credentials do |t|
      t.string :access_token
      t.string :spotify_id
    end
  end
end
