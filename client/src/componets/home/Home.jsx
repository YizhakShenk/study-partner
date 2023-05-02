import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostObjContext from '../../context/PostObjContext'
import Profie from '../profile/Profile';
import Nav from '../nav/Nav';
import About from '../about/About'
import Auth from '../authentication/Auth';
import Main from '../main/Main';
import UserProfile from '../userProfile/UserProfile';
import ConfirmPost from '../confirmPost/ConfirmPost';
import Notifications from '../notifications/Notifications';
import CreatePost from '../Post/CreatePost';
import { Box } from '@mui/material'


export default function Home() {

    const [openLogIn, setOpenLogIn] = useState(false);
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const [editPost, setEditPost] = useState(null);

    const handleCloseLogIn = () => {
        setOpenLogIn(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
                <PostObjContext.Provider value={{ setEditPost, setOpenCreatePost }}>
                    <BrowserRouter>
                        <Nav setOpenLogIn={setOpenLogIn} />
                        <Routes>
                            <Route path='/' element={<Main openCreatePost={openCreatePost} setOpenCreatePost={setOpenCreatePost} editPost={editPost} setEditPost={setEditPost} />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/profile' element={<Profie />} />
                            <Route path='/user' element={<UserProfile />} />
                            <Route path='/confirm-post' element={<ConfirmPost setOpenLogIn={setOpenLogIn} />} />
                            <Route path='notifications' element={<Notifications />} />
                        </Routes>
                        {openLogIn && <Auth handleCloseLogIn={handleCloseLogIn} openLogIn={openLogIn} />}
                    </BrowserRouter>
                        {openCreatePost && <CreatePost open={openCreatePost} setOpen={setOpenCreatePost} editPost={editPost} setEditPost={setEditPost}/>}
                </PostObjContext.Provider>
        </Box>
    );
}
