import '../App.css';

import * as React from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAtom, useSetAtom } from 'jotai';
import { sha256 } from 'js-sha256';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import { MESSAGE, API_URL, THEME } from './../components/Const';
import { isNullOrEmpty, isNull } from './../components/CommonFunc';
import Progress from './../components/Progress';
import SuccessMessage from './../components/SuccessMessage';
import { 
  isLoadingAtom
  , successMessageAtom
   } from './../components/Atoms';

function SignUp() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessageUserId, setErrorMessageUserId] = useState("");
  const [errorMessageUserName, setErrorMessageUserName] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState("");

  const [errorUserId, setErrorUserId] = useState(false);
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const setSuccessMessage = useSetAtom(successMessageAtom);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const userIdChange = (event) => {
    setUserId(event.target.value);
  };
  const userNameChange = (event) => {
    setUserName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isValidate = () => {
    let result = true;
    setErrorMessageUserId("");
    setErrorMessageUserName("");
    setErrorMessagePassword("");
    setErrorMessageConfirmPassword("");
    setErrorUserId(false);
    setErrorUserName(false);
    setErrorPassword(false);
    setErrorConfirmPassword(false);

    if(isNullOrEmpty(userId)){
      setErrorUserId(true);
      setErrorMessageUserId(MESSAGE.USERID_EMPTY);
      result = false;
    } else {
      //半角英字のみOK
      if (!userId.match(/^[a-zA-Z0-9_-]+$/)) {
        setErrorUserId(true);
        setErrorMessageUserId(MESSAGE.USERID_INVALID);
        result = false;
      } else if (userId.length < 5) {
        setErrorUserId(true);
        setErrorMessageUserId(MESSAGE.USERID_LENGTH_INVALID);
        result = false;
      }
    }

    if(isNullOrEmpty(userName)){
      setErrorUserName(true);
      setErrorMessageUserName(MESSAGE.USERNAME_EMPTY);
      result = false;
    }

    if(isNullOrEmpty(password)){
      setErrorPassword(true);
      setErrorMessagePassword(MESSAGE.PASSWORD_EMPTY);
      result = false;
    } else {
      //パスワードは8文字以上、英数字と記号を組み合わせてください
      if (!password.match(/^[a-zA-Z0-9]+[-/:-@[-´{-~]+$/)
          && !password.match(/^[-/:-@[-´{-~]+[a-zA-Z0-9]+$/)){
        setErrorPassword(true);
        setErrorMessagePassword(MESSAGE.PASSWORD_INVALID);
        result = false;
      } 
      if (password.length < 8) {
        setErrorPassword(true);
        setErrorMessagePassword(MESSAGE.PASSWORD_INVALID);
        result = false;
      }
    }

    if(isNullOrEmpty(confirmPassword)){
      setErrorConfirmPassword(true);
      setErrorMessageConfirmPassword(MESSAGE.CONFIRM_PASSWORD_EMPTY);
      result = false;
    } else if(password !== confirmPassword){
      setErrorConfirmPassword(true);
      setErrorMessageConfirmPassword(MESSAGE.CONFIRM_PASSWORD_INVALID);
      result = false;
    }

    return result;
  }

  /** ユーザID重複確認 */
  const isDuplicateUserId = () => {
    //setIsLoading(true);
    //onSubmit内でのみ使う想定なのでsetIsLoadingはしない
    return axios
      .post(API_URL.GET_USER, {
        user_id: userId
      })
      .then((response) => {
        errorFunc(MESSAGE.USERID_DUPLICATE);
        return false;
      })
      .catch((error) => {
        if(error.response?.status === 404){
          return true;
        }else{
          errorFunc(error.message);
          return false;
        }
        return;
      });
  }

  /** エラー処理 */
  const errorFunc = (_message) => {
    let message = MESSAGE.SIGN_UP_FAIL;
    if(!isNull(_message)) message = _message;
    setIsLoading(false);
    setErrorUserId(true);
    setErrorMessageUserId(message);
  }

  /** サインアップ処理 */
  const onSubmit = async (event) => {
    event.preventDefault();

    if(!isValidate()){
      return;
    }

    if(!await isDuplicateUserId()){
      return;
    }

    setIsLoading(true);

    axios
      .post(API_URL.CREATE_USER, {
        user_id: userId,
        user_name: userName,
        password: sha256(password)
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setSuccessMessage(MESSAGE.SIGN_UP_SUCCESS);
          setSubmitDisabled(true);
          setTimeout(() => {
            setSuccessMessage("");
          }, "2000");
        }else{
          errorFunc();
          return;
        }

      })
      .catch((error) => {
        errorFunc(error.message);
        return;
      });
  }

  const defaultTheme = createTheme(THEME);

  return (
    <div className="wrapper">
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SuccessMessage width="calc(32%)" />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {MESSAGE.SIGNUP}
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
                  error={errorUserName}
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userNamwe"
                  onChange={userNameChange}
                  helperText={errorMessageUserName}
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
                  onChange={passwordChange}
                  helperText={errorMessagePassword}
                />
              </Grid>
              <Grid item xs={12} className='grid-login-input'>
                <TextField
                  required
                  fullWidth
                  error={errorConfirmPassword}
                  name="confirmPassword"
                  label="ConfirmPassword"
                  type="password"
                  id="confirmPassword"
                  onChange={confirmPasswordChange}
                  helperText={errorMessageConfirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading || submitDisabled}
              startIcon={<AssignmentIndIcon />}
            >
              {MESSAGE.SIGNUP}
            </Button>
            <Progress/>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="/" variant="body2">
                  {MESSAGE.BACK_TO_TOP}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </div>
  );
}

export default SignUp;
