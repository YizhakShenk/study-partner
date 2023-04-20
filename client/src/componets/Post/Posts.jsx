import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import UrlContext from "../../context/UrlContext";
import Filters from "../filters/Filters";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,

} from "@mui/material";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const { urlServer } = useContext(UrlContext);
  const [rendering, setRendering] = useState(false);
  const handleRendering = () => {
    setRendering(!rendering);
  };

 

  useEffect(() => {
    (async () => {
      try {
        const postsList = await (
          await axios.get(`${urlServer}/post/get-all`)
        ).data;
        // for (let index = 0; index < postsList.length; index++) {
        //   if (!postsList.data.matched === 0) {
        //   }
        // }

        if (!postsList) {
          throw new Error("posts not dound");
        } else {
          setPosts(postsList);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [urlServer, rendering]);

  return (
    <Box alignItems="center">
      {posts ? (
        <Box>
          
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Filters setPosts={setPosts} handleRendering={handleRendering} />
          </Box>

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
