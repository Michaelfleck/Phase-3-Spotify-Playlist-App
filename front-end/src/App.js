import React, {useState, useEffect} from  'react'
import { Credentials } from './components/Credentials'
// import axios from 'axios';
import SignIn from './components/SignIn';
import UserCardMin from './components/UserCardMin';
import Song from './components/Song';

function App() {

  // const spotify = Credentials();

  // const [token, setToken] = useState('')

  // useEffect( () => {

  //   axios('https://accounts.spotify.com/api/token', {
  //     headers: {
  //       'Content-Type' : 'application/x-www-form-urlencoded',
  //       'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
  //   },
  //   data: 'grant_type=client_credentials',
  //   method: 'POST'
  // })
  // .then(tokenResponse => {
  //   console.log("testing tokenResponse")
  //   console.log(tokenResponse.data.access_token);
  //   setToken(tokenResponse.data.access_token)
  //   console.log("-----------------------")
  // });
  // }, []);

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
      <SignIn makePlaylist={makePlaylist} handleUsers={handleUsers}/>
      <UserCardMin />
      <Song />
    </div>
  );
}

export default App;
