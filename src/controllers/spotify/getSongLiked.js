import { spotifyServer } from "../../generalComponents/spotifyServer";

// Save new playlist in Spotify (create new entry if not exists already):
export const getSongLiked = async (spotifyAccessToken, songId) => {
  try {
    const res = await spotifyServer.get("/is_liked", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken, songId },
    });
    return res.data?.liked;
  } catch (err) {
    console.log(err);
  }
};
