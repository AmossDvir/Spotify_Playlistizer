import { spotifyServer } from "../../generalComponents/spotifyServer";

const getLikedArtists = async (spotifyAccessToken) => {
  try {
    var library = await spotifyServer.get("/liked_artists", {
      headers: {
        "content-type": "application/json",
      },
      params: { access_token: spotifyAccessToken },
    });
    library = library.data;
    return library;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getLikedArtists;
