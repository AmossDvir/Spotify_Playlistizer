import axios from "axios";
import { baseUrl } from "../../constants";
export const generatePlaylist = async (genres, spotifyAccessToken, length) => {
  try {
    const res = await axios.get(baseUrl + "spotify/generate", {
      headers: {
        "content-type": "application/json",
      },
      params: { genres, access_token: spotifyAccessToken, playlistLength:length },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
