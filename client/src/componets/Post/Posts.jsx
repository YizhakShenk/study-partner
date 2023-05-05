import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Filters from "../filters/Filters";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,

} from "@mui/material";
const urlServer= process.env.REACT_APP_URL_SERVER

export default function Posts() {
  const [posts, setPosts] = useState(null);
  // const [postsTemp,setPostsTemp] = useState(null);
  const [rendering, setRendering] = useState(false);

  const handleRendering = () => {
    setRendering(!rendering);
  };
  // const handleClear = () => {
  //   setPosts(postsTemp)
  // };


  useEffect(() => {
    (async () => {
      try {
        const postsList = await (
          await axios.get(`${urlServer}/post/get-all`)
        ).data;

        if (!postsList) {
          throw new Error("posts not dound");
        } else {
          setPosts(postsList);
          setPosts(postsList);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [ rendering]);

  return (
    <Box alignItems="center">
      {posts ? (
        <Box>
          {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
            <Filters setPosts={setPosts} handleRendering={handleRendering} />
          {/* </Box> */}
          <Grid container sx={{ placeContent: "center" }} spacing={1}>
            {posts && posts.length ? (
              posts.map((post, index) => {
                return (
                  <Grid item key={index}>
                    <PostCard post={post} />
                  </Grid>
                );
              })
            ) : (
              <Box sx={{ m: 3 }}>
                <Typography>No posts found.</Typography>
              </Box>
            )}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ marginTop: "20%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
