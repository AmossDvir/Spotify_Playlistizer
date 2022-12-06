import HomePage from "./components/Stepper";

const baseUrl = "http://localhost:3200/";

const routes = {
  home: {url :"/"},
  create: {url:"/create"},
  signUp: {url:"/sign_up"},
  settings: {url:'/settings'},
  redirect:{url:'/redirect'},
  playlistView:{url:'/playlists'},
};

const errorCodesLabels = {
  0: "",
  401: "You have entered an invalid username or password",
  400: "User already exists",
  500: "Internal server error", 
  "ERR_NETWORK": "Network error",
};

export { routes, baseUrl, errorCodesLabels };
