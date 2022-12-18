import axios from "axios";
import { baseUrl } from "../../constants";
export const getUserPlaylists = async (userId, spotifyAccessToken) => {
  try {
    const res = await axios.post(baseUrl + "spotify/playlists", {
      userId, spotifyAccessToken 
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
