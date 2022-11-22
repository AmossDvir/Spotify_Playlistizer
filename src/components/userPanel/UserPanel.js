import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Avatar, MenuItem, Divider, Typography, Box } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import { logoutUser } from "../../model/UserSlice";
import { routes } from "../../constants";

import "./UserPanel.css";

const UserPanel = ({ position, anchorEl, open, onClose, onClick }) => {
  const userSelector = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    dispatch(logoutUser());
    navigate(routes.home.url);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={onClose}
      onClick={onClick}
      PaperProps={{
        elevation: 0,
        sx: {minWidth:'30vh',
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 2,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
        <MenuItem sx={{display:"flex",justifyContent:"center", cursor:'default'}} onClick={(e) => e.stopPropagation()}>
        <Box display="flex" justifyContent="center" marginY={2}>
      <Typography sx={{ cursor: "default" }}>
        {userSelector.firstName} {userSelector.lastName}
      </Typography></Box></MenuItem>
      <Divider />


      <MenuItem>
        <Avatar /><Typography fontWeight={300}>My Account</Typography> 
      </MenuItem>

      <MenuItem component={Link} to={routes.settings.url}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <Typography fontWeight={300}>Settings</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography fontWeight={300}>Log Out</Typography>
      </MenuItem>
    </Menu>


  );
};

export default UserPanel;
