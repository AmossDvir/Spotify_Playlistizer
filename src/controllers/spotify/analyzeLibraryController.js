import axios from "axios";
import { baseUrl } from "../../constants";

const analyzeLibrary = async (spotifyAccessToken) => {
  try {
    var artists = await axios.get(baseUrl + "spotify/liked_artists", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken },
    });
    artists = artists.data;
    await new Promise(resolve => setTimeout(resolve, 10000));
    const res = await axios.post(baseUrl + "spotify/analyze", {
        headers: {
          "content-type": "application/json",
        },
        data:{access_token: spotifyAccessToken, artists}
      });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default analyzeLibrary;
