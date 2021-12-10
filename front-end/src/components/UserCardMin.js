import React from 'react'

function UserCardMin( { user }) {
    console.log(user)
    return (
        <div>
            <img className="user-image" src="" alt="placeholder image"/>
            <h1>Username: {user.display_name}</h1>
            <img src={!!user.image ? user.image : ""} />
            <a href={user.spotify_link}>Spotify Profile Link</a>
            <p>Top Tracks</p>
        </div>
    )
}

export default UserCardMin
