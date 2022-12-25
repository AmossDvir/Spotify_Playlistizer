import axios from "axios";
import { baseUrl } from "../../constants";

const getLikedArtists = async (spotifyAccessToken) => {
  try {
    var library = await axios.get(baseUrl + "spotify/liked_artists", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken },
    });
    library = library.data;
    return library;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getLikedArtists;
