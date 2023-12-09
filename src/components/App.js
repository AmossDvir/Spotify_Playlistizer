import Menu from "./Menu";
import React, { useEffect, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Stepper from "./Stepper";
import SignUp from "./SignUp";
import GenresPicker from "./GenresPicker";
import RedirectPage from "./Redirect/RedirectPage";
import BottomLine from "./BottomLine";
import LoggedOutPanel from "./LoggedOutPanel";
import UserSettingsPage from "./UserPanel/UserSettingsPage";
import PlaylistView from "./PlaylistView/";
import { baseUrl, REFRESH_TIMER, routes } from "../constants";
import DisconnectedSpotifyPanel from "./DisconnectedSpotifyPanel";
import Home from "./Home";
import Analyzer from "./Analyzer";
import "./App.css";
import ArtistTinder from "./ArtistTinder.js";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import useVerifyUser from "../controllers/user/useVerifyUser";
import { getUserInfo } from "../controllers/user/getUserInfo";

const App = () => {
  const dispatch = useDispatch();
  const [userContext, setUserContext] = useContext(UserContext);
  const userVerified = useVerifyUser();

  const verifyUser = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await axios.post(
          baseUrl + "users/refresh_token",
          {},
          { withCredentials: true }
        );
        if (response?.data?.success) {
          localStorage.setItem("access_token", response.data.accessToken);
        } else {
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        localStorage.removeItem("access_token");
      }
    }
  };

  useEffect(() => {
    verifyUser();
    const intervalId = setInterval(verifyUser, REFRESH_TIMER);
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    const updateUserData = async () => {
      const accessToken = localStorage.getItem("access_token");
  
      if (accessToken && !userContext?.loggedIn) {

        const user = await getUserInfo(accessToken);
        setUserContext((oldValues) => {
          return {...oldValues, ...user.data, loggedIn: true} ;
        });
      }
      else if(!accessToken && userContext?.loggedIn){
        setUserContext((oldValues) => {
          return {} ;
        });
      }
    }
    updateUserData();
    window.addEventListener('storage', updateUserData)
  
    return () => {
      window.removeEventListener('storage', updateUserData)
    }
  }, [])


  const HeaderAndFooter = () => (
    <>
      <Menu></Menu>
      <Stepper />
      <Outlet />
      <BottomLine></BottomLine>
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
            path={routes.artistTinder.url}
            element={
              <div className="main-frame">
                <ArtistTinder />
              </div>
            }
          />

          <Route
            path={routes.create.url}
            element={
              <div className="main-frame">
                {userVerified ? (
                  localStorage.getItem(
                    userContext?.userId + "spotifyAccessToken"
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
          element={<RedirectPage userId={userContext?.userId} />}
        />
      </Routes>
    </div>
  );
};

export default App;
