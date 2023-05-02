import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserConnected from "../../context/UserConnected";
import { Box, Button, Typography, Card, CardContent, CardMedia, CardActions, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const urlServer = process.env.REACT_APP_URL_SERVER

export default function RemindMe({ subName, date, time }) {
    const { userConnected } = useContext(UserConnected)
    const [sstempSubName, setStempSsubName] = useState();
    const [sstempDay, setSstempDay] = useState();
    const [sstempTime, setSstempTime] = useState();

    useEffect(() => {
        if (subName) {
            setStempSsubName(subName.toString());
        }
        if (date) {
            setSstempDay(`${date.$D < 10 ? "0" : ""}${date.$D}/${date.$M + 1 < 10 ? "0" : ""}${date.$M + 1}/${date.$y}`);
        }
        if (time) {
            setSstempTime(`${time.$H < 10 ? "0" : ""}${time.$H}:${time.$m < 10 ? "0" : ""}${time.$m}`);
        }
    }, [subName, date, time])

    const remindMe = async () => {
        try {
            if (!userConnected) {
                alert("you are not logged in please log in to complete");
                return;
            }
            console.log(sstempDay);
            console.log(sstempTime);
            const answer = await axios.post(`${urlServer}/alert/add-alert`, { email: userConnected.email || null, sub_category: sstempSubName || null, date: sstempDay || null, time: sstempTime || null })
            console.log(answer);
        }
        catch (err) {
            console.log(err);
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
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <CardContent sx={{}}>
                        <Box sx={{ textAlign: 'start' }}>
                            <Typography variant="h6">we havn't find any post match with your filter</Typography>
                            {sstempSubName && <Typography>Subject: {sstempSubName} </Typography>}
                            {sstempDay && <Typography>Date: {sstempDay} </Typography>}
                            {sstempTime && <Typography>Time: {sstempTime} </Typography>}
                        </Box>
                    </CardContent>
                    <CardContent sx={{}}>
                        <Typography variant="h6"> click here if you like to get an alert when someone will post similar as you searched</Typography>
                        {/* <Typography variant="h6"> click here if you like to get an alert on {sstempSubName} on {sstempDay} at {sstempTime} click below</Typography> */}
                        <IconButton onClick={remindMe}>
                            <AddIcon color="primary" fontSize="large" />
                        </IconButton>
                    </CardContent>
                </Box>
            </Card>
        </Box >
    )
}
