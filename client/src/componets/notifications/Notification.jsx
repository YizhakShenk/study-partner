import React from 'react'
import axios from 'axios'
import {urlServer} from '../../utilities/Url/url'
import { Box, ListItem,  ListItemText, Typography, Divider } from '@mui/material'

export default function Notification({ notification }) {
    const handleClick = async () => {
        await axios.put(`${urlServer}/notification/update`,{id:notification.id, has_readed:true});
        window.open(notification.url)
    }
    return (
        <Box onClick={handleClick}>
            <ListItem>
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
