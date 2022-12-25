import axios from "axios";
import { baseUrl } from "../../constants";

const getArtistsInfo = async (artists) => {
    console.log(artists)
  try {
    var summaries = await axios.get(baseUrl + "info/artists", {
      headers: {
        "content-type": "application/json",
      },
      params: { artists },
    });
    summaries = summaries.data;
    console.log(summaries)
    return summaries;
  } catch (err) {
    console.error(err);
  }
};
export default getArtistsInfo;
