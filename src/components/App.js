import  Menu  from "./menu/Menu"
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Redirect from "../Redirect";
import PlaylistPanel from "./PlaylistPanel";
import BottomLine from './BottomLine'

const App = () => {


  return (
    <div>
      <Menu></Menu>
      
      <div>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<PlaylistPanel />} />
      {/* <Route path="/sign_in" element={<SignIn />} /> */}
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/redirect" element={<Redirect />} />
      </Routes>
      </div>
      <BottomLine></BottomLine>
    </div>
  );
};

export default App;
