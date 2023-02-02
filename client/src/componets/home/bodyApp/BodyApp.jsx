import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserConnected from "../../../context/UserConnected";
import Auth from "../../authentication/auth/Auth";
import CreatePost from "../CreatePost/CreatePost";
import CreatePostButton from "./CreatePostButton";
import Posts from "./Posts/Posts";
import Box from "@mui/material/Box";

export default function BodyApp({ openLogIn, handleCloseLogIn }) {
  const { userConnected, setUserConnected } = useContext(UserConnected);
  const [openPost, setOpenPost] = useState(false);

  return (
    <Box>
<h1>search options</h1>

      {openLogIn &&<Auth handleCloseLogIn={handleCloseLogIn} openLogIn={openLogIn}/>}
      <Box>
        <Posts />
      </Box>
      <CreatePostButton setOpenPost={setOpenPost} />  
      {openPost && <CreatePost open={openPost} setOpen={setOpenPost} />}
    </Box>
  );
}
