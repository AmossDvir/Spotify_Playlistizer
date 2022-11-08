import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
import { Link } from "react-router-dom";

import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Drawer from "../../generalComponents/Drawer";
import SignIn from "../SignIn";

// import MenuItems from "./MenuItems";

const Menu = () => {

  const routes = {
    home: "/",
    create: "/create",
    signIn: "/sign_in",
    signUp: "/sign_up",
  };
  const [value, setValue] = useState(routes.home);

  useEffect(() => setValue(window.location.pathname));

  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

  const onMenuItemClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Drawer direction="right" open={loginDrawerOpen} setOpen={(open) => setLoginDrawerOpen(open)}><SignIn setDrawerOpen={setLoginDrawerOpen}></SignIn></Drawer>
      <Tabs
        value={value}
        onChange={onMenuItemClick}
        aria-label="icon label tabs example"
        sx={{backgroundColor:'grey'}}
      >
        <Tab
          icon={<AudiotrackIcon />}
          label=""
          component={Link}
          to={routes.home}
          value={routes.home}
        />
        <Tab
          icon={<FavoriteIcon />}
          label="Create New Playlist"
          component={Link}
          to={routes.create}
          value={routes.create}
        />
        <Tab
          icon={<PersonPinIcon />}
          label="Sign In"
          component={Link}
          onClick={() => setLoginDrawerOpen(!loginDrawerOpen)}
          // to={routes.signIn}
          sx={{ right: "0px", position: "absolute" }}
        />
        
        <Tab
          icon={<PersonPinIcon />}
          label="Sign Up"
          component={Link}
          to={routes.signUp}
          value={routes.signUp}
          sx={{ right: "12vh", position: "absolute" }}
        />
      </Tabs>
    </div>
  );
};

export default Menu;
