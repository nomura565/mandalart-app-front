import '../App.css';

import { useForm, SubmitHandler } from "react-hook-form";

import * as React from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessageUserId, setErrorMessageUserId] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const [errorUserId, setErrorUserId] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const userIdChange = (event) => {
    setUserId(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorMessageUserId("");
    setErrorMessagePassword("");
    setErrorUserId(false);
    setErrorPassword(false);

    if(userId === ""){
      setErrorUserId(true);
      setErrorMessageUserId("ユーザIDを入力してください");
    }

    if(password === ""){
      setErrorPassword(true);
      setErrorMessagePassword("パスワードを入力してください");
    }

  }

  const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Yusuke Nomura
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  return (
    <div className="wrapper">
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Mandalart App
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorUserId}
                  fullWidth
                  id="userId"
                  label="User Id"
                  name="userId"
                  autoComplete="userID"
                  onChange={userIdChange}
                  helperText={errorMessageUserId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorPassword}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={passwordChange}
                  helperText={errorMessagePassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? 
                  Please contact the administrator.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  </div>
  );
}

export default Login;
