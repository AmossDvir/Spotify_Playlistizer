import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDrawerOpen } from "../../model/globalStateSlice";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "../../generalComponents/Drawer";
import SignIn from "../SignIn";
import { logoutUser } from "../../model/UserSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { styled } from "@mui/material/styles";

const StyleTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: `rgb(100,100,100,${theme.palette.mode === "dark"?0.2:0.7})`,
  ...theme.typography.body2,

  textAlign: "center",
  display: "flex",
  alignItems: "center",
}));

const Menu = () => {
  const userSelector = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalState = useSelector((state) => state.globalState.value);
  const [value, setValue] = useState(routes.home);

  const onMenuItemClick = (event, newValue) => {
    setValue(newValue);
  };

  const onLogOut = () => {
    dispatch(logoutUser());
    navigate(routes.home);
    console.log(value);
  };

  useEffect(() => setValue(window.location.pathname));

  const renderUserMenuItems = () => {
    return !userSelector.loggedIn ? (
      <div>
        <Drawer
          direction="right"
          open={globalState.loginDrawerOpen}
          setOpen={(open) => dispatch(setLoginDrawerOpen(open))}
        >
          <SignIn></SignIn>
        </Drawer>
        <StyleTabs
          value={value}
          onChange={onMenuItemClick}
          aria-label="icon label tabs example"

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
            icon={<LoginIcon />}
            label="Sign In"
            component={Link}
            onClick={() =>
              dispatch(setLoginDrawerOpen(!globalState.loginDrawerOpen))
            }
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
        </StyleTabs>
      </div>
    ) : (
      <div>
        <Drawer
          direction="right"
          open={globalState.loginDrawerOpen}
          setOpen={(open) => dispatch(setLoginDrawerOpen(open))}
        >
          <SignIn></SignIn>
        </Drawer>
        <StyleTabs
          value={value}
          onChange={onMenuItemClick}
          aria-label="icon label tabs example"

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
            icon={<LogoutIcon />}
            label="Log Out"
            onClick={onLogOut}
            sx={{ right: "0px", position: "absolute" }}
          />
          <div onClick={() => {}} style={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                right: "12vh",
                position: "absolute",
                borderStyle: "dotted",
                borderWidth: "1px",
                cursor:'pointer',
                borderRadius: "10px",
                padding: "8px",
              }}
            >
              Hello {userSelector.firstName} {userSelector.lastName}
            </Typography>
          </div>
        </StyleTabs>
      </div>
    );
  };

  return renderUserMenuItems();
};

export default Menu;
