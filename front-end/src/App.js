import React, { useState, useEffect } from 'react'
import { Credentials } from './components/Credentials'
import SignIn from './components/SignIn';
import UserCardMin from './components/UserCardMin';

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
  const [selectedSongs, setSelectedSongs] = useState(new Set())
  
  const [users, setUsers] = useState([])
  const [ me, setMe ] = useState(null);
  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type
      } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      
      fetch(`http://localhost:9292/userInfo?access_token=${access_token}`)
        .then(async (resp) => setMe(await resp.json()))
        .then(() => fetch(`http://localhost:9292/userTracks`,{
          method: "post"
        }))
        .then(() => fetch(`http://localhost:9292/users`))
        .then(response => response.json())
        .then(userList => {
          setUsers(userList)
        })
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
  }, [users]);

return (
  <div>
    <SignIn handleLoginData={handleLoginData} />
    {users.map((user) => 
      <UserCardMin 
        onSelectSong={(uri) => {
          setSelectedSongs((selectedSongs) => 
            new Set([uri, ...Array.from(selectedSongs)])
          )
        }} 
        selectedSongs={selectedSongs}
        key={user.id} 
        user={user} 
        songs={songListElements} 
      />)}
    <div style={{ paddingTop: "2em"}} />
    <button onClick={() => fetch("http://localhost:9292/playlist", {method: "post", body: JSON.stringify({ id: me.id, uris: Array.from(selectedSongs)})})}>Make A Playlist!</button>
    <button onClick={() => fetch("http://localhost:9292/users", {method: "delete"})}> Kill all Humans! </button>
    <button onClick={() => fetch("http://localhost:9292/songs", {method: "delete"})}> Kill all Songs! </button>
  </div>
)};

export default App;
