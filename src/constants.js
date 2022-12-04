import HomePage from "./components/Stepper";

const baseUrl = "https://spotify-playlist-generator-server.onrender.com/";

const routes = {
  home: {url :"/"},
  create: {url:"/create"},
  signUp: {url:"/sign_up"},
  settings: {url:'/settings'},
  redirect:{url:'/redirect',},
  playlistView:{url:'/playlists',}
};

export { routes, baseUrl };
