import Menu from "./Menu";
import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "./Stepper";
import SignUp from "./SignUp";
import GenresPicker from "./GenresPicker";
import RedirectPage from "./Redirect/RedirectPage";
import BottomLine from "./BottomLine";
import LoggedOutPanel from "./LoggedOutPanel";
import UserSettingsPage from "./UserPanel/UserSettingsPage";
import PlaylistView from "./PlaylistView/";
import { routes } from "../constants";
import "./App.css";
import { loginUser } from "../model/userSlice";
import DisconnectedSpotifyPanel from "./DisconnectedSpotifyPanel";
import Home from "./Home";
import SpotifyPlayer from "react-spotify-web-playback";

const App = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user.value);
  const spotifyAccessToken = localStorage.getItem(userSelector.userId + "spotifyAccessToken");
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
      dispatch(loginUser(user));
    }
  }, []);

  const HeaderAndFooter = () => (
    <>
      <Menu></Menu>
      <Stepper />
      <Outlet />
      <BottomLine></BottomLine>
      {userSelector.loggedIn && spotifyAccessToken!==undefined && <div style={{position:'fixed', bottom:'0px',left: '0vw',right: '0vw'}} ><SpotifyPlayer magnifySliderOnHover showSaveIcon  styles={{
    activeColor: '#fff',
    bgColor: '#333',
    color: '#fff',
    loaderColor: '#fff',
    sliderColor: '#1cb954',
    trackArtistColor: '#ccc',
    trackNameColor: '#fff',
  }} token={spotifyAccessToken} ></SpotifyPlayer></div>}
    </>
  );

  return (
    <div className="all">
      <Routes>
        <Route element={<HeaderAndFooter />}>
          {/* <Route path={routes.home} element={<Home/>}/> */}
          <Route index element={<Home/>} />
          <Route path={routes.signUp.url} element={<SignUp />} />
          <Route path={routes.playlistView.url} element={<PlaylistView />} />
          <Route path={routes.settings.url} element={<UserSettingsPage />} />
          <Route
            path={routes.create.url}
            element={
              userSelector.loggedIn ? (
                localStorage.getItem(
                  userSelector.userId + "spotifyAccessToken"
                ) ? (
                  <GenresPicker />
                ) : (
                  <DisconnectedSpotifyPanel></DisconnectedSpotifyPanel>
                )
              ) : (
                <LoggedOutPanel></LoggedOutPanel>
              )
            }
          />
          {/* </Route> */}
        </Route>
        <Route
          path={routes.redirect.url}
          element={<RedirectPage userId={userSelector.userId} />}
        />
      </Routes>

      {/* <Menu></Menu>
      <HomePage />

      <div className="main-content">
        <Routes>
          <Route
            path={routes.create.url}
            element={
              userSelector.loggedIn ? (
                <PlaylistPanel />
              ) : (
                <LoggedOutPanel></LoggedOutPanel>
              )
            }
          />
          <Route path={routes.signUp.url} element={<SignUp />} />
          <Route path={routes.settings.url} element={<UserSettingsPage />} />
          <Route path={routes.redirect.url} element={<RedirectPage />} />
          <Route
            path={routes.playlistView.url}
            element={
              <PlaylistView
                songs={[
                  { title: "Smells Like Teen Spirit", artist: "Nirvana" },
                  { title: "Hey You", artist: "Pink Floyd" },
                  { title: "Creep", artist: "Radiohead", cover: pinkfloydIcon },
                  { title: "Dogs", artist: "Pink Floyd" },
                  { title: "Bold as Love", artist: "Jimi Hendrix" },
                ]}
              />
            }
          />
        </Routes>
      </div>
      <BottomLine></BottomLine> */}
    </div>
  );
};

export default App;
