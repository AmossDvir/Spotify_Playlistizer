import { spotifyServer } from "../../generalComponents/spotifyServer";
export const generatePlaylist = async (genres, spotifyAccessToken, length) => {
  try {
    const res = await spotifyServer.get("/generate", {
      headers: {
        "content-type": "application/json",
      },
      params: { genres, access_token: spotifyAccessToken, playlistLength:length },
    });
    return res;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
