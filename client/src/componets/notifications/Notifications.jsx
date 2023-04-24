import React, { useState, useContext } from 'react'
import Notification from './Notification';
import UserConnected from '../../context/UserConnected'
import { Box, List, Typography } from '@mui/material'


export default function Notifications() {

    const { userConnected } = useContext(UserConnected);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {userConnected ? <List sx={{ width: '60%', height: '100vh', backgroundColor: 'AliceBlue' }}>
                {userConnected && userConnected.notifications?.map((notification, index) => {
                    return <Notification notification={notification} key={index} />
                })}
            </List> :
                <Box>
                    <Typography>
                        Please Log In
                    </Typography>
                </Box>}
        </Box>
    )
}
