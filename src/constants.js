import HomePage from "./components/HomePage";

const baseUrl = "http://localhost:3200/";

const routes = {
  home: {url :"/", component:<HomePage></HomePage>},
  create: {url:"/create"},
  signUp: {url:"/sign_up"},
  settings: {url:'/settings'},
  redirect:{url:'/redirect',},
  playlistView:{url:'/playlist',}
};

export { routes, baseUrl };
