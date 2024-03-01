import { cyan } from '@mui/material/colors';

export const AUTHOR = "Yusuke Nomura";

export const SELECT_YYYY_LIST = [2024,2025];

/** テーマ */
export const THEME = {
  palette: {
    mode: 'light',
     primary: {
      main: '#00bcd4',
      contrastText:'#fff'
    }
    }  
}

/** ロールID */
export const ROLE = {
  GENERAL: 1,
  ADMIN: 2,
}

/** メッセージ */
export const MESSAGE = {
  USERID_EMPTY: "ユーザIDを入力してください",
  PASSWORD_EMPTY: "パスワードを入力してください",
  LOGIN_FAIL: "ユーザIDもしくはパスワードが間違っています",
}

export const BASE_URL = 'http://localhost:9050/api/';

export const API_URL = {
  LOGIN: BASE_URL + "users/login",
  GET_USER_LIST: BASE_URL + "users/getUserList",
}