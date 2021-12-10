import React from 'react'

function SignIn({makePlaylist,handleUsers,handleLoginData}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLoginData()        
    }
    return (
        <div>
            <form action="">
                <button type='submit' onClick={handleSubmit}>Sign in with Spotify</button>
            </form>
        </div>
    )
}

export default SignIn
