import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDrawerOpen } from "../../model/globalStateSlice";
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
    signUp: "/sign_up",
  };

  const dispatch = useDispatch();

  const globalState = useSelector((state) => state.globalState.value);
  const [value, setValue] = useState(routes.home);

  useEffect(() => setValue(window.location.pathname));


  const onMenuItemClick = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Drawer direction="right" open={globalState.loginDrawerOpen} setOpen={(open) => dispatch(setLoginDrawerOpen(open))}><SignIn></SignIn></Drawer>
      <Tabs
        value={value}
        onChange={onMenuItemClick}
        aria-label="icon label tabs example"
        sx={{backgroundColor:'#cfd3e0'}}
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
          onClick={() => dispatch(setLoginDrawerOpen(!globalState.loginDrawerOpen))}
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
