import axios from "axios";
import { baseUrl } from "../../constants";

export const getAvailableGenres = async (spotifyAccessToken) => {
  try {
    const res = await axios.get(baseUrl + "spotify/available_genres", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token:spotifyAccessToken },
    });
    return res.data.body.genres;
  } catch (err) {
    console.log(err);
  }
};
