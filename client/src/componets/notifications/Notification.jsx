import React from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const urlServer = process.env.REACT_APP_URL_SERVER;

export default function Notification({
  notification,
  expanded,
  handleChangePanel,
  panel,
}) {
  const handleOpen = async () => {
    handleChangePanel(panel);
    if (!notification.has_readed) {
      await axios.put(`${urlServer}/notification/update`, {
        id: notification.id,
        has_readed: true,
      });
    }
  };
  const handleClick = () => {
    if (notification.url) {
      window.open(notification.url);
    }
    return;
  };
  return (
    <Box sx={{ maxWidth: "350px" }}>
      {notification && (
        <Accordion expanded={expanded === panel} onChange={handleOpen}>
          <AccordionSummary
            sx={{
              backgroundColor: notification.has_readed ? "white" : "AliceBlue",
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            {notification.has_readed ? (
              <Typography>{notification.title}</Typography>
            ) : (
              <Typography sx={{ fontWeight: "bold" }}>
                {notification.title}
              </Typography>
            )}
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Box onClick={handleClick}>
              <Typography>{notification.message}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

// <Box
