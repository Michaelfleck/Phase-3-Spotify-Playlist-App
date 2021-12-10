import React, { useState, useEffect } from 'react'
import { Credentials } from './components/Credentials'
import axios from 'axios';
import SignIn from './components/SignIn';
import UserCardMin from './components/UserCardMin';
import TopReadTracks from './components/TopReadTracks';
import Listbox from './components/Listbox';

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
    console.log("handleLoginData ran")
  }

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    console.log(`hash: ${hash}`)
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {})

    return paramsSplitUp;
  }

  const [songListElements, setSongListElements] = useState([])
  const [userCards, setUserCards] = useState([])
  
  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type
      } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      // at this point we can store our data in the db
      // localStorage.clear();
      // localStorage.setItem("accessToken", access_token);
      // localStorage.setItem("tokenType", token_type);
      // localStorage.setItem("expiresIn", expires_in);
      fetch(`http://localhost:9292/userInfo?access_token=${access_token}`)
        .then(() => fetch(`http://localhost:9292/userTracks`,{
          method: "post"
        }))
        .then(() => fetch(`http://localhost:9292/users`))
        .then(response => response.json())
        .then(data => {
          const userList = data
          const cards = userList.map(el => {
            return <UserCardMin key={el.spotify_id} user={el} />
          })
          // setPrimaryUser(userList)
          // setUserCards(userCards)
          setUserCards(cards)
          return
        })
      // .then( () => window.location.replace("localhost:3000"))
    }
  }, []);


  //! Pass list of tracks down into listbox
  //! Then create song elements for each track --> these will be buttons
  //! buttons will switch is_selected on track in backend
  //! Then we need a button (MakePlaylist?) which will take all is_selected == true and pass into spotify to make playlist of tracks.
  //! Returned playlist id needs to be used to call the playlist itself
  //! Display playlist in new instance of listbox

  useEffect(() => {
    fetch('http://localhost:9292/songs')
      .then(r => r.json())
      .then(data => {
        setSongListElements(data)
      })
  }, [userCards]);

return (
  <div>
    <SignIn handleLoginData={handleLoginData} />
    {userCards}
    <TopReadTracks />
    <button>Make A Playlist!</button>
    <Listbox />
  </div>
)};

export default App;
