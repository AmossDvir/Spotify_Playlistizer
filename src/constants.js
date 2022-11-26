import HomePage from "./components/Stepper";

const baseUrl = "http://localhost:3200/";

const routes = {
  home: {url :"/"},
  create: {url:"/create"},
  signUp: {url:"/sign_up"},
  settings: {url:'/settings'},
  redirect:{url:'/redirect',},
  playlistView:{url:'/playlist',}
};

export { routes, baseUrl };
