import React from 'react'
import axios from 'axios'
import { Box, ListItem,  ListItemText, Typography, Divider } from '@mui/material'
const urlServer= process.env.REACT_APP_URL_SERVER

export default function Notification({ notification }) {
    const handleClick = async () => {
        await axios.put(`${urlServer}/notification/update`,{id:notification.id, has_readed:true});
        window.open(notification.url)
    }
    return (
        <Box onClick={handleClick}>
            <ListItem disablePadding>
                <ListItemText sx={{ textAlign: 'center' }}>
                    <Typography >
                        {notification.message}
                    </Typography>
                </ListItemText>
            </ListItem>
            <Divider />
        </Box>
    )
}
