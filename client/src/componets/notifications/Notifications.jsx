import React, { useContext, useState } from "react";
import Notification from "./Notification";
import UserConnected from "../../context/UserConnected";
import { Box, List, Typography, Paper, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { userConnected } = useContext(UserConnected);
  const navigate = useNavigate();

  // const [expanded, setExpanded] = useState(1);
  const [expanded, setExpanded] = useState("")

  const handleChangePanel = (panel) => {
    if (expanded === panel) {
      setExpanded(" ");
      return;
    }
    setExpanded(panel);
  };



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: 1,
      }}
    >
      {userConnected ? (
        <List
        // backgroundColor: "silver" 
          sx={{ width: "60%", height: "87vh" }}
        >
          <Paper elevation={12} sx={{height:'100%'}}>
          {userConnected &&
            userConnected.notifications?.map((notification, index) => {
              return <Notification notification={notification} expanded={expanded} handleChangePanel={handleChangePanel} panel={index+1}  key={index} />;
            })}
          </Paper>
        </List>
      ) : (
        <Box sx={{ height: '40vh', mt: '20%' }}>
          <Typography variant='h5'>Please log in then you can see your notifications !</Typography>
          <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/')}>Back to home page</Button>
        </Box>
      )}
    </Box>
  );
}
