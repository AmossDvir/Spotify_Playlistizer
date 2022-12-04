import axios from "axios";
import { baseUrl } from "../../constants";

// Save new playlist in the DB (create new entry if not exists already):
export const savePlaylist = async (playlist, userId) => {
  try {
    console.log(playlist);
    const res = await axios.post(baseUrl + "spotify/save", {
      headers: {
        "content-type": "application/json",
      },
      data:{playlist, userId}
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
