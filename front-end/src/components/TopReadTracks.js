import React, { useEffect, useState } from "react";
import axios from "axios";


const TOP_READ_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks"

const TopReadTracks = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"))
      }
    },[]);


    const handleTopReadTracks = () => {
      axios.get(TOP_READ_TRACKS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      // .then(response => response.json())
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };

    return <button onClick={handleTopReadTracks}>Test Top Read Tracks</button>
  }


export default TopReadTracks;