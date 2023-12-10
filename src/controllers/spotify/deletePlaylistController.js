import { spotifyServer } from "../../generalComponents/spotifyServer";

// Delete playlist from the DB (based on the id):
export const deletePlaylist = async (playlistId, userId) => {
  try {
    const res = await spotifyServer.delete(
      "/delete",
      { data: playlistId },
      {
        headers: {
          Authorization:
            localStorage.getItem("access_token") !== null
              ? `Bearer ` + localStorage.getItem("access_token")
              : null,
          "Content-Type": "application/json",
        },
      }
    );


  } catch (err) {}
};
