/** nullと空白文字の判定 */
export const isNullOrEmpty = (value) => {
  return (!value || !value.match(/\S/g));
}

/** セッション情報設定 */
export const setSession = (userInfo) => {
  localStorage.setItem('Mandalart-App-UserInfo', JSON.stringify(userInfo));
}

/** セッション情報削除 */
export const removeSession = () => {
  localStorage.removeItem('Mandalart-App-UserInfo');
}

/** セッション情報取得 */
export const getSession = () => {
  const userInfo = localStorage.getItem('Mandalart-App-UserInfo');
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {};
  }
}

/** セッション情報取得 */
export const getObjectCopy = (obj) => {
  return Object.assign({}, obj);
}