import React, { useState } from "react";
import CreatePost from "../Post/CreatePost";
import CreatePostButton from "../Post/CreatePostButton";
import Posts from "../Post/Posts";
import PostObjContext from '../../context/PostObjContext'
import { Box, Typography, } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';


export default function Main() {

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [editPost, setEditPost] = useState(null);

  return (
    <Box>
      <Box mt={3} mb={3}>
        <Typography variant="h5">Study Partner</Typography>
        <Typography variant="body1">Find partner to study common interests topics</Typography>
      </Box>
      <Box>
        <PostObjContext.Provider value={{ setEditPost, setOpenCreatePost }}>
          <Posts />
        </PostObjContext.Provider>
      </Box>
      <CreatePostButton setOpenCreatePost={setOpenCreatePost} />
      {openCreatePost && <CreatePost open={openCreatePost} setOpen={setOpenCreatePost} editPost={editPost} setEditPost={setEditPost}/>}
    </Box>  
  );
}
