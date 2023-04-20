import React, { useState, useContext } from "react";
import UserConnected from "../../context/UserConnected";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ListItemIcon,
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
  Button,
  Divider,
  Badge,
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from "@mui/icons-material/Logout";
import { useColorScheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";


export default function Nav({ setOpenLogIn }) {
  const navigae = useNavigate();
  const { mode, setMode } = useColorScheme();
  const { userConnected, setUserConnected } = useContext(UserConnected);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
    handleCloseUserMenu();
  };
  const handleLogOut = () => {
    handleCloseUserMenu();
    ((name) => {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    })("token");
    ((name) => {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    })("id");
    sessionStorage.removeItem("user");
    setUserConnected(null);
  };
  const modeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  const handleBodyValContent = () => {
    navigae("/");
  };
  const HandleProfilePage = () => {
    handleCloseUserMenu();
    navigae("/profile");
  };
  const handleAboutPage = () => {
    handleCloseUserMenu();
    navigae("/about");
  };

  const handleNotifications = () => {
    navigae("/notifications");
  }
  const countNotificates = () => {
    let count = 0;
    if (userConnected.notifications.length < 1) {
      return null
    }
    userConnected.notifications?.forEach(item => {
      if (item.has_readed !== false) {
        count++;
      }

    });
    return count
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: '90px' }}>
          <Button type="link" onClick={handleBodyValContent}>
            <Avatar sx={{ width: 60, height: 50 }} alt="LOGO" src="SP.png" />
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Study Partner */}
          </Typography>

          {userConnected && <Badge badgeContent={countNotificates()} color="error">
            <NotificationsIcon onClick={handleNotifications} />
          </Badge>}

          <IconButton sx={{ margin: 2 }} onClick={modeToggle} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="open user options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {!userConnected ? (
                    <Avatar />
                  ) : (
                    <Avatar>
                      {userConnected.name
                        ? userConnected.name.slice(0, 1).toUpperCase()
                        : " "}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorUserMenu)}
                onClose={handleCloseUserMenu}
              >
                {userConnected ? (
                  <Box>
                    <MenuItem onClick={HandleProfilePage}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleAboutPage}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      About
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogOut}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Log Out
                    </MenuItem>
                  </Box>
                ) : (
                  <Box>
                    <MenuItem onClick={handleOpenLogIn}>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Log In
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleAboutPage}>
                      <ListItemIcon>
                        <InfoIcon fontSize="small" />
                      </ListItemIcon>
                      About
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
