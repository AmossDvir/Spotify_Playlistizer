import { spotifyServer } from "../../generalComponents/spotifyServer";
export const retrieveArtistsByGenres = async (
  genres,
  spotifyAccessToken,
  length = 50,
  fromLibrary = true
) => {
  try {
    const res = await spotifyServer.get("/retrieve_artists", {
      headers: {
        "content-type": "application/json",
      },
      params: {
        genres,
        access_token: spotifyAccessToken,
        playlistLength: length,
        fromLibrary,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
