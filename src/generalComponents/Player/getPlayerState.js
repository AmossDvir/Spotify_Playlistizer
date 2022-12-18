// import parseJson from "parse-json";
import axios from "axios";

const PLAYERURL = `https://api.spotify.com/v1/me/player`

export const  getPlayerState = (token) => {
    // Make a call using the token
    var res;
    axios.get(PLAYERURL, {headers: { Authorization: `Bearer ${token}`}}).then(result => res = result);
    return res;
  }
