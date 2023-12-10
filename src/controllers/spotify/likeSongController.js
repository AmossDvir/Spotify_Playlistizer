import { spotifyServer } from "../../generalComponents/spotifyServer";

// Save new playlist in Spotify (create new entry if not exists already):
export const likeSong = async (songId, like, spotifyAccessToken) => {
  try {
    const res = await spotifyServer.post("/like", {
      headers: {
        "content-type": "application/json",
      },
      data: {
        songId, 
        access_token: spotifyAccessToken,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
