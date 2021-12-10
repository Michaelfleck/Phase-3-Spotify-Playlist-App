import React, {useState, useEffect} from  'react'
import { Credentials } from './components/Credentials'
// import axios from 'axios';
import SignIn from './components/SignIn';
import UserCardMin from './components/UserCardMin';
import Song from './components/Song';
import TopReadTracks from './components/TopReadTracks';

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
 
  
    useEffect(() => {
      if (window.location.hash) {
          const {
            access_token,
            expires_in,
            token_type
          } = getReturnedParamsFromSpotifyAuth(window.location.hash);

          // at this point we can store our data in the db
          localStorage.clear();
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
          fetch(`http://localhost:9292/userInfo?access_token=${access_token}`)
          .then( () => fetch(`http://localhost:9292/userTracks`))
          .then( () => fetch(`http://localhost:9292/users`))
          .then(response => response.json())
          .then(data => {
              const userList = data
              const cards = userList.map(el => {
                return <UserCardMin key={el.spotify_id} user={el}/>
              })
              // setPrimaryUser(userList)
              // setUserCards(userCards)
              setUserCards(cards)
              return 
          })
          // .then( () => window.location.replace("localhost:3000"))
        }
    },[]);

  // const [primaryUser, setPrimaryUser] = useState([])
  const [userCards, setUserCards] = useState([])

  // const [secondaryUser, setSecondaryUser] = useState({
  //   username: "",
  //   password: ""
  // })

  // const handleUsers = (username,password) => {
  //   if (username !== null && username !== undefined){
  //     if (primaryUser.username.length === 0){
  //     setPrimaryUser({
  //       username: username,
  //       password: password
  //     })
  //   } else {
  //     setSecondaryUser({
  //       username: username,
  //       password: password
  //     })
  //   }} else {
  //     alert("Invalid User Credentials You Idiot")
  //   }
  // }

  
  const makePlaylist = () => {
    //This is where we need to find the user's song trends

  }

  // const testData = () => {
  //   console.log(user)
  // }



  // const userMaker = () => {
  //   if (primaryUser.length !== 0){
  //      const userCards = primaryUser.map(el => {
  //       return <UserCardMin key={el.spotify_id} primaryUser={el}/>
  //      })
  //     return userCards
  //   } else {
  //     return <p> UserCard1 waiting to load... </p>
  //   }
  // }



  return (
    <div>
      {/* removed handleUsers={handleUsers} */}
      <SignIn makePlaylist={makePlaylist} handleLoginData={handleLoginData}/>
      {userCards}
      <Song />
      <TopReadTracks />
      {/* <button onClick={testData}>Console Log Primary User</button> */}
    </div>
  );
}

export default App;
