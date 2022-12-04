import axios from "axios";
import { baseUrl } from "../../constants";
export const generatePlaylist = async (genres, spotifyAccessToken) => {
  try {
    const res = await axios.get(baseUrl + "spotify/generate", {
      headers: {
        "content-type": "application/json",
      },
      params: { genres, access_token: spotifyAccessToken },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
