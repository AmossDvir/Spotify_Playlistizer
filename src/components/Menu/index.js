import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginDrawerOpen } from "../../model/globalStateSlice";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import Drawer from "../../generalComponents/Drawer";
import SignIn from "../SignIn";
import { routes } from "../../constants";
import { styled } from "@mui/material/styles";
import UserPanel from "../UserPanel";

const StyleTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: `rgb(100,100,100,${
    theme.palette.mode === "dark" ? 0.2 : 0.7
  })`,
  ...theme.typography.body2,

  textAlign: "center",
  justifyItems: "center",
  display: "flex",
  alignItems: "center",
}));

const Menu = () => {
  const userSelector = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState.value);
  const [value, setValue] = useState(routes.home.url);
  const [anchorElUserSettings, setAnchorElUserSettings] = useState(null);

  const onMenuItemClick = (event, newValue) => {
    setValue(newValue);
  };



  const onUserSettingsOpen = (event) => {
    setAnchorElUserSettings(event.currentTarget);
  };

  const onUserSettingsClose = () => {
    setAnchorElUserSettings(null);
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
            to={routes.home.url}
            value={routes.home.url}
          />
          <Tab
            icon={<FavoriteIcon />}
            label="Create New Playlist"
            component={Link}
            to={routes.create.url}
            value={routes.create.url}
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
            to={routes.signUp.url}
            value={routes.signUp.url}
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
            to={routes.home.url}
            value={routes.home.url}
          />
          <Tab
            icon={<FavoriteIcon />}
            label="Create New Playlist"
            component={Link}
            to={routes.create.url}
            value={routes.create.url}
          />
          <Tab value={routes.settings.url}
            sx={{ right: "0vh", position: "absolute", cursor:'default' }}
            icon={
              <Tooltip title="Account settings">
                <IconButton
                  onClick={onUserSettingsOpen}
                  size="medium"
                  // sx={{ ml: 2 }}
                  aria-controls={
                    Boolean(anchorElUserSettings) ? "account-menu" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={
                    Boolean(anchorElUserSettings) ? "true" : undefined
                  }
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{userSelector?.firstName[0]?.toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
            }
          ></Tab>
          <div
            onClick={() => {}}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              sx={{
                right: "12vh",
                position: "absolute",
                borderStyle: "dotted",
                borderWidth: "1px",
                cursor: "pointer",
                borderRadius: "10px",
                padding: "8px",
              }}
            >
              Hello {userSelector.firstName} {userSelector.lastName}
            </Typography>
          </div>
        </StyleTabs>
        <UserPanel
          anchorEl={anchorElUserSettings}
          open={Boolean(anchorElUserSettings)}
          onClose={onUserSettingsClose}
          onClick={onUserSettingsClose}
        ></UserPanel>
      </div>
    );
  };

  return renderUserMenuItems();
};

export default Menu;
