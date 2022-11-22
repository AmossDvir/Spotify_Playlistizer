import Menu from "./menu/Menu";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import PlaylistPanel from "./genresPicker";
import RedirectPage from "./Redirect/RedirectPage";
import BottomLine from "./BottomLine";
import LoggedOutPanel from "./LoggedOutPanel";
import UserSettingsPage from "./userPanel/UserSettingsPage";
import PlaylistView from "./playlistView/PlaylistView";
import { routes } from "../constants";
import "./App.css";
import pinkfloydIcon from "../resources/pinkfloyd.jfif";

const App = () => {
  const HeaderAndFooter = () => (
    <>
      <Menu></Menu>
      <HomePage />
      <Outlet />
      <BottomLine></BottomLine>
    </>
  );

  const userSelector = useSelector((state) => state.user.value);
  return (
    <div className="all">
      <Routes>
        <Route element={<HeaderAndFooter />}>
          {/* <Route path={routes.home}> */}
            <Route index element={<></>} />
            <Route path={routes.signUp.url} element={<SignUp />} />
            <Route path={routes.settings.url} element={<UserSettingsPage />} />
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
          {/* </Route> */}
        </Route>
        <Route path={routes.redirect.url} element={<RedirectPage />} />
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
