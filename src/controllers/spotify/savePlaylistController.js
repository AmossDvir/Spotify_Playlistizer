import { spotifyServer } from "../../generalComponents/spotifyServer";

// Save new playlist in the DB (create new entry if not exists already):
export const savePlaylist = async (playlist, userId) => {
  try {
    const res = await spotifyServer.post("/save", {  
      progress: progressEvent => console.log(progressEvent),
      headers: {
        "content-type": "application/json",
      },
      data:{playlist, userId}
    });
    return res;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
