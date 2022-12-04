import axios from "axios";
import { baseUrl } from "../../constants";
export const getUserPlaylists = async (userId) => {
  try {
    const res = await axios.get(baseUrl + "spotify/get", {
      headers: {
        "content-type": "application/json",
      },
      params: { userId },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
