import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profie from '../profile/Profile';
import Nav from '../nav/Nav';
import About from '../about/About'
import Auth from '../authentication/Auth';
import Main from '../main/Main';
import UserProfile from '../userProfile/UserProfile';
import ConfirmPost from '../confirmPost/ConfirmPost';
import { Box } from '@mui/material'


export default function Home() {
    const [openLogIn, setOpenLogIn] = useState(false);

    const handleCloseLogIn = () => {
        setOpenLogIn(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <BrowserRouter>
                <Nav setOpenLogIn={setOpenLogIn} />
                <Routes>
                    <Route path='/' element={<Main openLogIn={openLogIn} handleCloseLogIn={handleCloseLogIn} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/profile' element={<Profie />} />
                    <Route path='/user' element={<UserProfile />} />
                    <Route path='/confirm-post' element={<ConfirmPost setOpenLogIn={setOpenLogIn} />} />
                </Routes>
                {openLogIn && <Auth handleCloseLogIn={handleCloseLogIn} openLogIn={openLogIn} />}
            </BrowserRouter>
        </Box>
    );
}
