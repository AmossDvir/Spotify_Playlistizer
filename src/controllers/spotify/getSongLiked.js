import axios from "axios";
import { baseUrl } from "../../constants";

// Save new playlist in Spotify (create new entry if not exists already):
export const getSongLiked = async (spotifyAccessToken, songId,) => {
  try {
    const res = await axios.get(baseUrl + "spotify/is_liked", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken, songId },
    })
    console.log(res.data.liked);
    
    return res.data?.liked;
  } catch (err) {
    console.log(err);
  }
};
