import React, {useState, useEffect} from  'react'
import { Credentials } from './components/Credentials'
import axios from 'axios';

function App() {

  const spotify = Credentials();

  const [token, setToken] = useState('')

  useEffect( () => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {
    console.log("testing tokenResponse")
    console.log(tokenResponse.data.access_token);
    setToken(tokenResponse.data.access_token)
    console.log("-----------------------")
  });
  }, []);



  return (
    <div>
      Hello
    </div>
  );
}

export default App;
