import React, { useEffect, useState, useContext,useReducer } from "react";
import axios from "axios";
import UserConnected from "../../context/UserConnected";
import { Box, Typography, Card, CardContent, IconButton, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const urlServer = process.env.REACT_APP_URL_SERVER

export default function RemindMe({ subName, date, time,getDateStemp,getTimeStemp }) {
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
        }, 3500)
    }

    const remindMe = async () => {
        try {
            const sstempSubName=''
            const strDay=''
            const strTime=''
            if (!userConnected) {
                alert("you are not logged in please log in to complete");
                return;
            }
            console.log(strDay);
            console.log(strTime);
            const answer = await axios.post(`${urlServer}/alert/add-alert`, { user_id: userConnected.id || null, sub_category: sstempSubName || null, date: getDateStemp(date) || null, time: getTimeStemp(time) || null })
            console.log(answer);
            handleOpenAlert("success", answer.data);
        }
        catch (err) {
            console.log(err);
            handleOpenAlert("error", err.response.data);
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                sx={{
                    margin: 3,
                    maxWidth: 500,
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    {opanAlert ? <Alert onClose={() => setOpanAlert(false)} sx={{ position: 'absolute', width: '100%' }} severity={alertMode}>{alertMessage}</Alert> : null}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <CardContent sx={{}}>
                        <Box sx={{ textAlign: 'start' }}>
                            <Typography variant="h6">we havn't find any post match with your filter</Typography>
                            {sstempSubName && <Typography>Subject: {sstempSubName} </Typography>}
                            {strDay && <Typography>Date: {strDay} </Typography>}
                            {strTime && <Typography>Time: {strTime} </Typography>}
                        </Box>
                    </CardContent>
                    <CardContent sx={{}}>
                        <Typography variant="h6"> click here if you like to get an alert when someone will post similar as you searched</Typography>
                        <IconButton onClick={remindMe}>
                            <AddIcon color="primary" fontSize="large" />
                        </IconButton>
                    </CardContent>
                </Box>
            </Card>
        </Box >
    )
}
