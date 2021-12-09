import React from 'react'

function UserCardMin( { primaryUser }) {
    return (
        <div>
            <img className="user-image" src="" alt="placeholder image"/>
            <h1>Username: {primaryUser.display_name}</h1>
            <img src={primaryUser.images[0].url} />
            <a href={primaryUser.external_urls.spotify}>Spotify Profile Link</a>
            <p>Top Tracks</p>
        </div>
    )
}

export default UserCardMin
