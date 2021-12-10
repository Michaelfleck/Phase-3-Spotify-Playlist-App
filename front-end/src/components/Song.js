import React from 'react'

function Song({track, selected, onSelect}) {
    return (
        <div className="Track" >
            <button style={{ backgroundColor: selected ? "blue" : null, color: selected ? "white" : null  }} onClick={() => { onSelect(track.spotify_uri) }}>
                {track.song_name} • {track.artist_name}
            </button>
        </div>
    )
}

export default Song
