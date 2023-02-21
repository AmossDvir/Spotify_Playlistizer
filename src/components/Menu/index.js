import React, { useState, useEffect, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";
import ScienceIcon from '@mui/icons-material/Science';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import { UserContext } from "../../context/UserContext";
import useVerifyUser from "../../controllers/user/useVerifyUser";

const StyleTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: `rgb(100,100,100,${
    theme.palette.mode === "dark" ? 0.2 : 0.7
  })`,
  ...theme.typography.body2,
height:"fit-content",
  textAlign: "center",
  justifyItems: "center",
  display: "flex",
  alignItems: "center",
}));

const Menu = () => {
  const [userContext, setUserContext] = useContext(UserContext)
  const userVerified = useVerifyUser();

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
    return !userVerified? (
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

          sx={{
            "& .MuiTabs-flexContainer": {
              flexWrap: "wrap",
            },
          }}
        >
          <Tab
            icon={<FavoriteIcon />}
            label=""
            component={Link}
            to={routes.home.url}
            value={routes.home.url}
            sx={{ minWidth:'0px'}}
          />
          <Tab
            icon={<AddIcon />}
            label="Create"
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
            icon={<FavoriteIcon/>}
            label=""
            component={Link}
            to={routes.home.url}
            value={routes.home.url}
            sx={{}}
          />
          <Tab
            icon={<AddIcon />}
            label="Create"
            component={Link}
            to={routes.create.url}
            value={routes.create.url}
          />
          <Tab
            icon={<ScienceIcon />}
            label="Analyze"
            component={Link}
            to={routes.analyzer.url}
            value={routes.analyzer.url}
          />
          <Tab
            icon={<NightlifeIcon />}
            label="Artist Tinder"
            component={Link}
            to={routes.artistTinder.url}
            value={routes.artistTinder.url}
          />
          <Tab
            value={routes.settings.url}
            onClick={onUserSettingsOpen}
            sx={{ right: "0vh", position: "absolute", cursor: "default" }}
            icon={
              <Tooltip title="Account settings">
                <IconButton
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
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {userContext?.firstName?.length > 0 ? userContext?.firstName[0]?.toUpperCase() : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
            }
          ></Tab>

          <Tab
            icon={<AudiotrackIcon />}
            sx={{
              right: "10vh",
              position: "absolute",
            }}
            label="My Playlists"
            component={Link}
            to={routes.playlistView.url}
            value={routes.playlistView.url}
          />
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
