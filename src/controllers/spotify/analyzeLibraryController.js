import axios from "axios";
import { baseUrl } from "../../constants";
import { spotifyServer } from "../../generalComponents/spotifyServer";

const analyzeLibrary = async (spotifyAccessToken) => {
  try {
    var library = await spotifyServer.get("/liked_artists", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken },
    });
    library = library.data;
    await new Promise(resolve => setTimeout(resolve, 10000));
    const res = await spotifyServer.post("/analyze", {
        headers: {
          "content-type": "application/json",
        },
        data:{access_token: spotifyAccessToken, library}
      });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default analyzeLibrary;
