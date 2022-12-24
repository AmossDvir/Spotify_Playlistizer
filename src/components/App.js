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
import { loginUser } from "../model/userSlice";
import DisconnectedSpotifyPanel from "./DisconnectedSpotifyPanel";
import Home from "./Home";
import PlayerProvider from "../generalComponents/Player/PlayerProvider";
import Analyzer from "./Analyzer";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user.value);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginUser(user));
    }
  }, []);

  const HeaderAndFooter = () => (
    <>
      <Menu></Menu>
      <Stepper />
      <Outlet />
      {/* <BottomLine></BottomLine> */}
    </>
  );

  return (
    <div className="all">
      <Routes>
        <Route element={<HeaderAndFooter />}>
          <Route index element={<Home />} />
          <Route
            path={routes.signUp.url}
            element={
              <div className="main-frame">
                <SignUp />
              </div>
            }
          />
          <Route
            path={routes.playlistView.url}
            element={
              <div className="main-frame">
                <PlaylistView />
              </div>
            }
          />
          <Route
            path={routes.settings.url}
            element={
              <div className="main-frame">
                <UserSettingsPage />
              </div>
            }
          />
          <Route
            path={routes.analyzer.url}
            element={
              <div className="main-frame">
                <Analyzer />
              </div>
            }
          />
          
          <Route
            path={routes.create.url}
            element={
              <div className="main-frame">
                {userSelector.loggedIn ? (
                  localStorage.getItem(
                    userSelector.userId + "spotifyAccessToken"
                  ) ? (
                    <GenresPicker />
                  ) : (
                    <DisconnectedSpotifyPanel></DisconnectedSpotifyPanel>
                  )
                ) : (
                  <LoggedOutPanel></LoggedOutPanel>
                )}
              </div>
            }
          />
        </Route>
        <Route
          path={routes.redirect.url}
          element={<RedirectPage userId={userSelector.userId} />}
        />
      </Routes>
    </div>
  );
};

export default App;
