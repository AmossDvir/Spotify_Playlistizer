import { spotifyServer } from "../../generalComponents/spotifyServer";
export const getUserPlaylists = async (userId, spotifyAccessToken) => {
  try {
    const res = await spotifyServer.post("/playlists", {
      userId, spotifyAccessToken 
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
