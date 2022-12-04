import axios from "axios";
import { baseUrl } from "../../constants";

// Save new playlist in Spotify (create new entry if not exists already):
export const saveToSpotify = async (playlistName, description,isPublic, playlist, spotifyAccessToken ) => {
    
  try {
    const res = await axios.post(baseUrl + "spotify/export", {
      headers: {
        "content-type": "application/json",
      },
      data:{playlistName, description, isPublic, playlist, access_token:spotifyAccessToken }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
