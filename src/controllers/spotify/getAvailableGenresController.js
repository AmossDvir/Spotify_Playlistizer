import { spotifyServer } from "../../generalComponents/spotifyServer";

export const getAvailableGenres = async (spotifyAccessToken) => {
  try {
    const res = await spotifyServer.get("/available_genres", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken },
    });
    return res.data.body.genres;
  } catch (err) {
    console.log(err);
  }
};
