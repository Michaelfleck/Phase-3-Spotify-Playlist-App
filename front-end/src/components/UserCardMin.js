import React from 'react'
import Song from './Song'

function UserCardMin( { user, songs, onSelectSong, selectedSongs }) {
    console.log(user)
    console.log(songs)
    return (
        <div>
            <img className="user-image" src="" alt="placeholder image"/>
            <h1>Username: {user.display_name}</h1>
            <img src={!!user.image ? user.image : ""} />
            <a href={user.spotify_link}>Spotify Profile Link</a>
            <p>Top Tracks</p>
            <div style={{ display: 'flex', flexDirection: "column" }}>
                {songs
                    .filter((song) => song.user_id === user.id)
                    .map((song) => 
                        <Song 
                        selected={selectedSongs.has(song.spotify_uri)} 
                        onSelect={onSelectSong} 
                        key={song.id} 
                        track={song}
                        />
                    )}
            </div>
        </div>
    )
}

export default UserCardMin
