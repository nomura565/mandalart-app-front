export const AUTHOR = "Yusuke Nomura";

export const SELECT_YYYY_LIST = [2024, 2025];

/** テーマ */
export const THEME = {
  palette: {
    primary: {
      light: '#a3cddd',
      main: '#96bfd3',
      contrastText: '#fff'
    },
    error: {
      main: '#cd4338',
      contrastText: '#fff'
    },
    background: {
      default: '#f6f8f7',
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          marginTop: '0px !important'
        }
      }
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
  USERNAME_EMPTY: "ユーザ名を入力してください",
  PASSWORD_EMPTY: "パスワードを入力してください",
  DEPARTMENT_EMPTY: "部署を選択してください",
  CONFIRM_PASSWORD_EMPTY: "パスワード（確認用）を入力してください",
  CONFIRM_PASSWORD_INVALID: "パスワード（確認用）が一致しません",
  USERID_INVALID: "ユーザIDに不適切な文字が含まれています",
  LOGIN_FAIL: "ユーザIDもしくはパスワードが間違っています",
  SIGN_UP_FAIL: "アカウント作成に失敗しました",
  USERID_DUPLICATE: "既に使用されているユーザIDです",
  CANCEL: "キャンセル",
  EXECUTE: "実行",
  CLEAR_ALL_DIALOG_TITLE: "目標と実績をオールクリアしますか？",
  CLEAR_ALL_DIALOG_CONTENT: "画面上の目標と実績を全て初期状態にします。\n※データベースの値には影響しません",
  CLEAR_ALL_SPEED_DIAL: "目標と実績をオールクリア",
  SAVE_SPEED_DIAL: "{0}の目標と実績として保存",
  OUTPUT_SPEED_DIAL: "現在の目標と実績を出力",
  SAVE_DIALOG_TITLE: "目標と実績を保存しますか？",
  SAVE_DIALOG_CONTENT: "画面上の目標と実績を{0}のデータとして保存します。",
  SAVE_SUCCESS: "目標と実績を保存しました。",
  SELECT_USER_LABEL: "ユーザ選択",
  SELECT_YM_LABEL: "比較する年月",
  SELECT_YM_LABEL2: "表示中の年月",
  SELECT_YY_LABEL: "表示中の年",
  COMPARE: "比較",
  SHOW: "表示",
  WHEN_ACHIEVEMENT: "{0}の実績を表示中",
  NO_ACHIEVEMENT: "実績の登録なし",
  TARGET_MESSAGE: "目標の登録がまだされていません",
  ACHIEVEMENT_LEVEL_1: "意識し始めた",
  ACHIEVEMENT_LEVEL_2: "意識できるようになった",
  ACHIEVEMENT_LEVEL_3: "常に意識できている",
  LOGIN_REMARKS: "Don't have an account? Please Sign Up",
  LOGIN: "Login",
  LOGOUT: "Logout",
  TITLE: "Mandalart App",
  ACHIEVEMENT_INPUT: "実績入力",
  TARGET_INPUT: "目標登録",
  GROWTH_RECORD: "成長記録",
  GROWTH_MESSAGE: "点滅セルは比較している年月から成長しています！",
  SIGNUP: "Create an account",
  BACK_TO_TOP: "Back to Top",
  SIGN_UP_SUCCESS: "アカウントを作成しました。",
  USERID_LENGTH_INVALID: "ユーザIDは5文字以上設定してください",
  PASSWORD_INVALID: "パスワードは8文字以上24文字以下で設定してください",
  INPUT_YET: "入力中",
  OUTPUT_FILE_NAME: "{0}のマンダラート.png",
  USER_NAME: "ユーザ名",
  MAX_YYYYMM: "最終登録月",
  ACHIEVEMENT_GAUGE_VALUE: "達成率",
  ACHIEVEMENT_STATUS: "達成状況",
  DEPARTMENT: "部署",
  NO_SELECT: "選択無し",
}

export const BASE_URL = 'http://localhost:9050/api/';
/** 検証環境用 */
//export const BASE_URL = 'http://172.16.1.64:3000/api/';

export const API_URL = {
  LOGIN: BASE_URL + "users/login",
  GET_USER_LIST: BASE_URL + "users/getUserList",
  GET_CHECK_LIST: BASE_URL + "users/getCheckList",
  GET_ACHIEVEMENT_LIST: BASE_URL + "users/getAcheivementList",
  GET_DEPARTMENT_LIST: BASE_URL + "users/getDepartmentList",
  GET_USER: BASE_URL + "users/getUser",
  CREATE_USER: BASE_URL + "users/createUser",
  SAVE_MANDALART: BASE_URL + "mandalart/saveMandalart",
  GET_MANDALART: BASE_URL + "mandalart/getMandalart",
}