import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserConnected from "../../context/UserConnected";
import UrlContext from "../../context/UrlContext.js";

import {
  Tooltip,
  Button,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Avatar,
  Box
} from "@mui/material";

import axios from "axios";

export default function ExtendedPost({ post, setIsSendingEmail, setEmailSent  }) {

  const { urlServer } = useContext(UrlContext);
  const { userConnected } = useContext(UserConnected);
  const navigae = useNavigate();
  

  const handleBeMyPartner = async () => {
    try {
      setIsSendingEmail(true);
      const answer = await axios.post(
        urlServer + "/activity/react-to-post",
        { the_applicant_id: userConnected.id, postId: post.id },
        { withCredentials: true }
      );
      if (!answer.data) {
        
        throw new Error('fail to send email');
      }
      console.log(answer.data);
      setEmailSent(1);
    } catch (err) {
      console.log(err);
      setEmailSent(-1);
    }
  };

  return (  
         <Box>
          <DialogContent sx={{ padding: 5 }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={10}>
                  <Typography gutterBottom variant="body1">
                    Hi, my name is {post.auther_name}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    I am looking for a partner to study
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {post.category}, {post.sub_category}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    on {post.date} between {post.time_from} to {post.time_to}
                  </Typography>
                  <Typography gutterBottom variant="body1" marginTop={3} marginLeft={3}>
                    {post.post}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Avatar
                    variant="rounded"
                    alt="Remy Sharp"
                    src={require('./cardPics/' + post.category + '.jpg')}
                    sx={{ width: 175, height: 175 }}
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ paddingTop: 5 }}>
                <Button
                  onClick={() => {
                    userConnected && (userConnected.id === post.user_id) ?
                      navigae("/profile")
                      : navigae("/user", { state: { userId: post.user_id } })
                  }}
                  variant="outlined"
                  size="small"
                >
                  View profile
                </Button>
                {userConnected ? (
                  (userConnected.id !== post.user_id) && <Button
                    onClick={handleBeMyPartner}
                    variant="outlined"
                    size="small"
                  >
                    be my partner
                  </Button>
                ) : (
                  <Tooltip
                    title="Only logged-in users can use this feature."
                    arrow
                  >
                    <span style={{ marginLeft: "5px" }}>
                      <Button variant="outlined" disabled size="small">
                        be my partner
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </DialogActions>
          </DialogContent>
        </Box> 
  );
}





