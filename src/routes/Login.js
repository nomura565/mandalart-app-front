import '../App.css';

import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAtom, useSetAtom } from 'jotai';
import { sha256 } from 'js-sha256';
import LoginIcon from '@mui/icons-material/Login';

import { AUTHOR, MESSAGE, API_URL, THEME } from './../components/Const';
import { isNullOrEmpty, setSession, isNull } from './../components/CommonFunc';
import Progress from './../components/Progress';
import {
  isLoadingAtom
  , loggedInAtom
} from './../components/Atoms';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);

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

  const isValidate = () => {
    let result = true;
    setErrorMessageUserId("");
    setErrorMessagePassword("");
    setErrorUserId(false);
    setErrorPassword(false);

    if (isNullOrEmpty(userId)) {
      setErrorUserId(true);
      setErrorMessageUserId(MESSAGE.USERID_EMPTY);
      result = false;
    }

    if (isNullOrEmpty(password)) {
      setErrorPassword(true);
      setErrorMessagePassword(MESSAGE.PASSWORD_EMPTY);
      result = false;
    }

    return result;
  }

  /** ログイン処理 */
  const onSubmit = (event) => {
    event.preventDefault();

    if (!isValidate()) {
      return;
    }

    setIsLoading(true);

    axios
      .post(API_URL.LOGIN, {
        user_id: userId,
        password: sha256(password)
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setLoggedIn(true);
          setSession(response.data);
          navigate("/Top");
        } else {
          errorFunc();
          return;
        }

      })
      .catch((error) => {
        errorFunc((error.response?.status === 404)
          ? undefined
          : error.message
        );
        return;
      });
  }

  /** エラー処理 */
  const errorFunc = (_message) => {
    let message = MESSAGE.LOGIN_FAIL;
    if (!isNull(_message)) message = _message;
    setIsLoading(false);
    setErrorUserId(true);
    setErrorPassword(true);
    setErrorMessagePassword(message);
  }

  /** 著作権 */
  const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/nomura565/mandalart-app-front">
          {AUTHOR}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const defaultTheme = createTheme(THEME);

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
            <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {MESSAGE.TITLE}
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} className='grid-login-input'>
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
                <Grid item xs={12} className='grid-login-input'>
                  <TextField
                    required
                    fullWidth
                    error={errorPassword}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                disabled={isLoading}
                startIcon={<LoginIcon />}
              >
                {MESSAGE.LOGIN}
              </Button>
              <Progress />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {MESSAGE.LOGIN_REMARKS}
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
