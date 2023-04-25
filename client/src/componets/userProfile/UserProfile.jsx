import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import UserPosts from './UserPosts';
import UserConnected from '../../context/UserConnected';
import {
  Paper,
  Button,
  Rating,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
const urlServer= process.env.REACT_APP_URL_SERVER

export default function UserProfile() {
  const {
    state: { userId },
  } = useLocation();
  const [user, setUser] = useState();
  const [rate, setRate] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const { userConnected } = useContext(UserConnected);

  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.post(
          `${urlServer}/user/get-one`,
          { id: userId }
        );
        setUser(userData.data);
        setRate(userData.data.rate);
      }
      catch (err) {
        console.log(err);
      }
    })()
  }, [userId])
  const handleRate = async (newValue) => {
    console.log('newVal >>', newValue);
    const newRate = await axios.put(urlServer + '/activity/rate-user',
      { email: user.email, rate: newValue },
      { withCredentials: true });

    setRate(newRate.data);
    setIsRating(rating => !rating)
  }

  const handleCancelRate = () => {
    setIsRating(rating => !rating)
  }
  return (
    <Box>
      {user ? (
        <Box>
          <Box sx={{ flexGrow: 1 }} >
            <Grid container minHeight={300} >

              <Grid item xs={12} sm={12} md={3}>
                <Box sx={{ display: "flex", justifyContent: "center", }}>
                  <Avatar sx={{ width: 100, height: 100, marginTop: 5 }} />
                </Box>
                <Box sx={{ m: 5 }}>
                  <Rating
                    precision={0.5}
                    disabled={!isRating}
                    value={rate || null}
                    onChange={(event, newValue) => {
                      handleRate(newValue);
                    }}
                  />
                  {userConnected && <Box>
                    {!isRating ? <Button onClick={() => setIsRating(rating => !rating)}>Rate</Button> : <Button onClick={handleCancelRate}>Cancel</Button>}
                  </Box>}

                </Box>
              </Grid>

              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
                md={9}
                xs={12}
                sm={12}
              >
                <Box sx={{ m: 3 }}>
                  {" "}
                  <Typography
                    sx={{ textDecoration: "underline" }}
                    color="primary"
                    variant="h3"
                  >
                    {user.name}
                  </Typography>{" "}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Age:</Typography>{" "}
                    <Typography sx={{}}>{user.age}</Typography>{" "}
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Country:</Typography>{" "}
                    <Typography sx={{}}>{user.country}</Typography>{" "}
                  </Paper>
                  <Paper
                    sx={{
                      display: "flex",
                      m: 3,
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "130px",
                    }}
                  >
                    <Typography variant="caption">Languages Skill:</Typography>{" "}
                    <Typography sx={{}}>{user.languages}</Typography>{" "}
                  </Paper>
                </Box>
                <Box sx={{ minWidth: "95%", m: 3 }}>
                  <Paper
                    sx={{
                      display: "flex",
                      padding: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "100%",
                    }}
                  >
                    {" "}
                    <Typography variant="caption">About Me:</Typography>{" "}
                    <Typography>
                      {user.about || "User hasn't added yet..."}
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ minWidth: "96%", m: 2 }}>
                  <Paper sx={{ m: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ textDecoration: "underline" }}
                    >
                      All Subjects
                    </Typography>
                    <Box sx={{ m: 1, display: 'flex', flexWrap: 'wrap' }}>
                      {user.subjects && user.subjects.map((item, index) => {
                        return <Paper key={index} sx={{ m: 3, padding: 2 }}>
                          <Typography align='center'> {item.name} </Typography>

                        </Paper>
                      })}

                    </Box>
                  </Paper>
                </Box>
              </Grid>

            </Grid>
          </Box>
          <Divider />
          <Box>
            {user.posts && <UserPosts posts={user.posts} />}
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: "20%" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

