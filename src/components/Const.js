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
    },
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
  CANCEL: "キャンセル",
  EXECUTE: "実行",
  CLEAR_ALL_DIALOG_TITLE: "目標と実績をオールクリアしますか？",
  CLEAR_ALL_DIALOG_CONTENT: "画面上の目標と実績を全て初期状態にします。\n※データベースの値には影響しません",
  CLEAR_ALL_SPEED_DIAL: "目標と実績をオールクリア",
  SAVE_SPEED_DIAL: "{0}の目標と実績として保存",
  SAVE_DIALOG_TITLE: "目標と実績を保存しますか？",
  SAVE_DIALOG_CONTENT: "画面上の目標と実績を{0}のデータとして保存します。",
  SAVE_SUCCESS: "目標と実績を保存しました。",
  SELECT_USER_LABEL: "ユーザ選択",
  SELECT_YM_LABEL: "年月選択",
  COMPARE: "比較",
  SHOW: "表示",
  WHEN_ACHIEVEMENT: "{0}の実績",
  NO_ACHIEVEMENT: "実績の登録なし",
  TARGET_MESSAGE: "目標の登録がまだされていません",
  ACHIEVEMENT_LEVEL_1: "意識し始めた",
  ACHIEVEMENT_LEVEL_2: "意識できるようになった",
  ACHIEVEMENT_LEVEL_3: "常に意識できている",
  LOGIN_REMARKS: "Don't have an account? Please contact the administrator.",
  LOGIN: "Login",
  LOGOUT: "Logout",
  TITLE: "Mandalart App",
}

export const BASE_URL = 'http://localhost:9050/api/';

export const API_URL = {
  LOGIN: BASE_URL + "users/login",
  GET_USER_LIST: BASE_URL + "users/getUserList",
  SAVE_MANDALART: BASE_URL + "mandalart/saveMandalart",
  GET_MANDALART: BASE_URL + "mandalart/getMandalart",
}