import Menu from "./menu/Menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import Redirect from "../Redirect";
import PlaylistPanel from "./playlistPanel";
import BottomLine from "./BottomLine";
import LoggedOutPanel from "./LoggedOutPanel";
import "./App.css"
import { useSelector } from "react-redux";

const App = () => {
  const userSelector = useSelector((state) => state.user.value);
  return (
      <div className="all">
        <Menu></Menu>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={userSelector.loggedIn?<PlaylistPanel />:<LoggedOutPanel></LoggedOutPanel>} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/redirect" element={<Redirect />} />
          </Routes>
        </div>
        <BottomLine></BottomLine>
      </div>
  );
};

export default App;
