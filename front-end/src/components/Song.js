import React from 'react'

function Song({track}) {
    return (
        <div className="Track">
            <button>{track.song_name} • {track.artist_name}</button>
        </div>
    )
}

export default Song
