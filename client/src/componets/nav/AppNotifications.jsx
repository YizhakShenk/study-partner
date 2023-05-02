import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState, useContext } from "react";
import UserConnected from "../../context/UserConnected";
import Notification from "../notifications/Notification";
export default function AppNotifications() {
  const { userConnected, setUserConnected } = useContext(UserConnected);

  const [expanded, setExpanded] = useState("");
  const [anchorUserNotf, setAnchorUserNotf] = useState(null);

  const handleOpenUserNotf = (event) => {
    setAnchorUserNotf(event.currentTarget);
  };
  const handleCloseUserNotf = () => {
    setAnchorUserNotf(null);
  };
  
  const countNotificates = () => {
    let count = 0;
    if (userConnected.notifications.length < 1) {
      return null;
    }
    userConnected.notifications?.forEach((item) => {
      if (item.has_readed === false) {
        count++;
      }
    });
    return count;
  };

  const handleChangePanel = (panel) => {
    if (expanded === panel) {
      setExpanded(" ");
      return;
    }
    setExpanded(panel);
  };
  return (
    <Box>
      {userConnected && (
        <IconButton color="inherit" onClick={handleOpenUserNotf}>
          <Badge badgeContent={countNotificates()} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      )}
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorUserNotf}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorUserNotf)}
        onClose={handleCloseUserNotf}
      >
        {userConnected && userConnected.notifications.length > 0 ? (
          userConnected.notifications.map((notification, index) => {
            return (
              <Notification
                notification={notification}
                expanded={expanded}
                handleChangePanel={handleChangePanel}
                panel={index + 1}
                key={index}
              />
            );
          })
        ) : (
          <MenuItem>
            <Typography>No notifications found</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
