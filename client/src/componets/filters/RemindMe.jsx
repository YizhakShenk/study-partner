import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserConnected from "../../context/UserConnected";

import { Box, Typography, Card, CardContent, IconButton, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const urlServer = process.env.REACT_APP_URL_SERVER

export default function RemindMe({ subName, date, time,getDateStemp,getTimeStemp ,clearFilter}) {
    const { userConnected } = useContext(UserConnected)
    const [sstempSubName, setStempSsubName] = useState();
    const [strDay, setStrDay] = useState();
    const [strTime, setStrTime] = useState();
    const [alertMessage, setAlertMessage] = useState('');
    const [opanAlert, setOpanAlert] = useState(false);
    const [alertMode, setAlertMode] = useState('');

    useEffect(() => {
        if (subName) {
            setStempSsubName(subName);
        }
        else {
            setStempSsubName(null);
        }
        if (date &&  !isNaN(date.$D)) {
            setStrDay(`${date.$D < 10 ? "0" : ""}${date.$D}/${date.$M + 1 < 10 ? "0" : ""}${date.$M + 1}/${date.$y}`);
        }
        else {
            setStrDay(null);
        }
        if (time && !isNaN(time.$D)) {
            setStrTime(`${time.$H < 10 ? "0" : ""}${time.$H}:${time.$m < 10 ? "0" : ""}${time.$m}`);
        }
        else { 
            setStrTime(null) 
        }
    }, [])

    const handleOpenAlert = (alertStatus, message) => {
        setAlertMode(alertStatus);
        setAlertMessage(message)
        setOpanAlert(true);
        setTimeout(() => {
            setOpanAlert(false);
            clearFilter();
        }, 3000)
    }

    const remindMe = async () => {
        try {
            if (!userConnected) {
                alert("you are not logged in please log in to complete");
                return;
            }
            const answer = await axios.post(`${urlServer}/alert/add-alert`, { user_id: userConnected.id || null, sub_category: sstempSubName || null, date: getDateStemp(date) || null, time: getTimeStemp(time) || null })
            handleOpenAlert("success", answer.data);
        }
        catch (err) {
            console.log(err);
            handleOpenAlert("error", err.response.data);
        }
    }
    return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
    >
      <Card sx={{ width: "50%" }}>
        <Box sx={{ position: 'relative' }}>
                    {opanAlert ? <Alert onClose={() => setOpanAlert(false)} sx={{ position: 'absolute', width: '100%' }} severity={alertMode}>{alertMessage}</Alert> : null}
                </Box>
              <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="h6">
                  we havn't find any post match with your filter
                </Typography>
                {sstempSubName && (
                  <Typography variant="subtitle1">
                    Subject: {sstempSubName}
                  </Typography>
                )}
                {sstempDay && (
                  <Typography variant="subtitle1">
                    Date: {sstempDay}
                  </Typography>
                )}
                {sstempTime && (
                  <Typography variant="subtitle1">
                    Time: {sstempTime}
                  </Typography>
                )}
              </CardContent>
              <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="body1">
                  click below if you like to get an alert when someone will post
                   as you searched
                </Typography>
              </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={remindMe} >
            alert me
          <AddIcon color="primary"  />
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
