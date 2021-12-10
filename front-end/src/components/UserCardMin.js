import React from 'react'
import Song from './Song'

function UserCardMin( { user, songs, onSelectSong, selectedSongs }) {
    console.log(user)
    console.log(songs)
    return (
        <div class="UserCard">
            {/* <img className="user-image" src="" alt="placeholder image"/> */}
            <h1 class='CardHeader'>User: {user.display_name}</h1>
            <img class="circle" src={!!user.image ? user.image : ""} />
            <h3><a href={user.spotify_link}>Spotify Profile</a></h3>
            <p>Top Tracks</p>
            <div class="tracks" style={{ display: 'flex', flexDirection: "column" }}>
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
