import React from 'react'
import { useState } from 'react'

function SignIn({makePlaylist,handleUsers}) {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUsers(user,password)
        setUser("")
        setPassword("")

    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type='text' placeholder='Username/email' value={user} onChange={(e) => setUser(e.target.value)}></input>
                <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Submit</button>
            </form>
                <button onClick={makePlaylist}>Make Playlist</button>
        </div>
    )
}

export default SignIn
