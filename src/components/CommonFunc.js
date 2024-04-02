/** nullと空白文字の判定 */
export const isNullOrEmpty = (value) => {
  return (!value || !value.match(/\S/g));
}

/** nullの判定 */
export const isNull = (value) => {
  return (typeof(value) === "undefined" ||  value === null);
}

/** セッション情報設定 */
export const setSession = (userInfo) => {
  sessionStorage.setItem('Mandalart-App-UserInfo', JSON.stringify(userInfo));
}

/** セッション情報削除 */
export const removeSession = () => {
  sessionStorage.removeItem('Mandalart-App-UserInfo');
}

/** セッション情報取得 */
export const getSession = () => {
  const userInfo = sessionStorage.getItem('Mandalart-App-UserInfo');
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

/** コンテントの改行をタグに変換 */
export const translateNewLine = (content) => {
  return content.split('\n').map((item, idx) => {
    return (
      <div key={idx}>{item}</div>
    )
  });
}