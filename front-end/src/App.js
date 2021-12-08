import React, {useState, useEffect} from  'react'
import { Credentials } from './components/Credentials'
// import axios from 'axios';
import SignIn from './components/SignIn';
import UserCardMin from './components/UserCardMin';
import Song from './components/Song';

function App() {

  const spotify = Credentials();

  const CLIENT_ID = spotify.ClientId
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
  const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000/callback/"

  // Listing out what we want from each user documentation here: https://developer.spotify.com/documentation/general/guides/authorization/scopes/#ugc-image-upload
  const SCOPES = ["user-read-playback-state",
                  "user-modify-playback-state",
                  "user-read-private",
                  "user-follow-read",
                  "user-library-modify",
                  "user-library-read",
                  "streaming",
                  "playlist-modify-private",
                  "playlist-read-collaborative",
                  "app-remote-control",
                  "user-read-email",
                  "playlist-read-private",
                  "user-top-read",
                  "playlist-modify-public",
                  "user-read-currently-playing",
                  "user-read-recently-played"]
  
  
  const SPACE_DELIMITER = "%20"
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)


  const handleLoginData = (handleData) => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }



  const [primaryUser, setPrimaryUser] = useState({
    username: "",
    password: ""
  })
  const [secondaryUser, setSecondaryUser] = useState({
    username: "",
    password: ""
  })
  const handleUsers = (username,password) => {
    if (username !== null && username !== undefined){
      if (primaryUser.username.length === 0){
      setPrimaryUser({
        username: username,
        password: password
      })
    } else {
      setSecondaryUser({
        username: username,
        password: password
      })
    }} else {
      alert("Invalid User Credentials You Idiot")
    }
  }
  const makePlaylist = () => {
    //This is where we need to find the user's song trends

  }

  return (
    <div>
      <SignIn makePlaylist={makePlaylist} handleUsers={handleUsers} handleLoginData={handleLoginData}/>
      <UserCardMin />
      <Song />
    </div>
  );
}

export default App;
