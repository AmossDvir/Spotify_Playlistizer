import Menu from "./menu/Menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import Redirect from "../Redirect";
import PlaylistPanel from "./playlistPanel";
import BottomLine from "./BottomLine";
import "./App.css"

const App = () => {
  return (
      <div className="all">
        <Menu></Menu>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<PlaylistPanel />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/redirect" element={<Redirect />} />
          </Routes>
        </div>
        <BottomLine></BottomLine>
      </div>
  );
};

export default App;
