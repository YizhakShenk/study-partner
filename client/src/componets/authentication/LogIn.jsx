import axios from "axios";
import React, { useState, useContext } from "react";
import UserConnected from "../../context/UserConnected";
import { emailValid, passwordValid } from "../../utilities/validetion/validetion.js";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import UrlContext from "../../context/UrlContext.js";

export default function Login({ handleAuthMode, handleCloseLogIn, handleOpenAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserConnected } = useContext(UserConnected);
  const { urlServer } = useContext(UrlContext);

  const submit = async () => {
    if (!email || !password) {
      handleOpenAlert('error', 'Missing Details');
    }
    else if (!emailValid(email)) {
      handleOpenAlert('error', 'Email is not valid!');
    } else if (!passwordValid(password)) {
      handleOpenAlert('error', 'Password is not valid!');
    } else {
      try {
        const answer = await axios.post(
          urlServer + "/auth/log-in",
          { email, password },
          { withCredentials: true }
        );
        sessionStorage.setItem("user", JSON.stringify(answer.data));
        sessionStorage.setItem("user_id", JSON.stringify(answer.data.id));
        setUserConnected(answer.data);
        handleOpenAlert('success', 'Welcome! and good luck finding a partner');
        handleCloseLogIn();
      }
      catch (err) {
        handleOpenAlert('error', 'Login Faild!');
        console.log(err);
      }
    }
  };
  return (
    <Box
      m={2}

      sx={{
        width: {
          xs: 240,
          sm: 285,
          md: 400,
        },
        // maxWidth: 450,
        // minWidth: 100,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: "sm",
        boxShadow: "xl",
      }}
    >
      <Box>
        <Typography variant="h5" align="center">
          Log in
        </Typography>
      </Box>
      <TextField
        variant='standard'
        required
        // error={email && !emailValid(email)}
        id="email"
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        variant='standard'
        required
        // error={password && !passwordValid(password)}
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Link
        underline="hover"
        onClick={() => {
          handleAuthMode(2);
        }}
      >
        forgt password?
      </Link>
      <Button color="success" variant="contained" type="submit" sx={{ width: '100%', }} onClick={submit}>
        Log in
      </Button>
      <Button variant="contained" type="submit" sx={{ mb: 2, width: '100%', }} onClick={() => { handleAuthMode(1) }}>
        Sign Up
      </Button>
    </Box>
  );
}