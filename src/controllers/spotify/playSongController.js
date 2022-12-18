import axios from "axios";
const spotifyBaseURL = "https://api.spotify.com/v1/me/player/";

const playSong = async (spotifyAccessToken, device, song) => {
  try {
    const res = await axios.put(
        spotifyBaseURL + "play",{ uris: [song.uri] },
      { params: {
        device_id: device.id,
      },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default playSong;
