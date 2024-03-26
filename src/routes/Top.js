import '../App.css';

import * as React from 'react';
import { useState, useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { format } from 'react-string-format';

import { MESSAGE, API_URL, SELECT_YYYY_LIST, ROLE, THEME } from './../components/Const';
import { getSession, getObjectCopy, isNull } from './../components/CommonFunc';
import { formatDateToYM } from './../components/FormatDate';

import Progress from './../components/Progress';
import MandalartCellRow from './../components/MandalartCellRow';
import BottomNav from './../components/BottomNav';
import ErrorMessage from './../components/ErrorMessage';
import SuccessMessage from './../components/SuccessMessage';
import Logout from './../components/Logout';
import BasicSpeedDial from './../components/BasicSpeedDial';
import ExplanatoryNote from './../components/ExplanatoryNote';
import AchievementGauge from './../components/AchievementGauge';

import { 
  isLoadingAtom
  , selectYmFuncAtom
  , textFieldDisabledAtom
  , bottomNavValueAtom
  , mandalartCellListAtomsAtom
  , errorMessageAtom
  , initMandalartCell
  , selectUserIdAtom
  , successMessageAtom
  , whenAchievementAtom
  , targetMessageAtom
  , whenDataAtom
  , selectYmAtom
  , isSuccessAtom
  , saveDialogOpenAtom
   } from './../components/Atoms';

function Top() {
  const defaultTheme = createTheme(THEME);
  const currentYyyymm = formatDateToYM(new Date());

  const setIsLoading = useSetAtom(isLoadingAtom);

  const [selectUserId, setSelectUserId] = useAtom(selectUserIdAtom);
  const [selectYm, setSelectYm] = useAtom(selectYmAtom);
  const [isAdmin] = useState((getSession().role_id === ROLE.ADMIN) ? true : false);
  const [userId] = useState(getSession().user_id);
  //比較する年月左の調整用
  const AdjustWidth = "470px";

  const setSaveDialogOpen = useSetAtom(saveDialogOpenAtom);
  const [selectYmFunc, setSelectYmFunc] = useAtom(selectYmFuncAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setIsSuccess = useSetAtom(isSuccessAtom);
  const setWhenAchievement = useSetAtom(whenAchievementAtom);
  const setWhenData = useSetAtom(whenDataAtom);
  const [bottomNavValue, setBottomNavValue] = useAtom(bottomNavValueAtom);
  const setTargetMessage = useSetAtom(targetMessageAtom);
  const setTextFieldDisabled = useSetAtom(textFieldDisabledAtom);

  const mandalartCellList= useAtomValue(mandalartCellListAtomsAtom);
  //愚直に0～81までのatomを作る　愚直すぎるのであくまで暫定
  const [mandalartCell0, setMandalartCell0] = useAtom(mandalartCellList[0]);
  const [mandalartCell1, setMandalartCell1] = useAtom(mandalartCellList[1]);
  const [mandalartCell2, setMandalartCell2] = useAtom(mandalartCellList[2]);
  const [mandalartCell3, setMandalartCell3] = useAtom(mandalartCellList[3]);
  const [mandalartCell4, setMandalartCell4] = useAtom(mandalartCellList[4]);
  const [mandalartCell5, setMandalartCell5] = useAtom(mandalartCellList[5]);
  const [mandalartCell6, setMandalartCell6] = useAtom(mandalartCellList[6]);
  const [mandalartCell7, setMandalartCell7] = useAtom(mandalartCellList[7]);
  const [mandalartCell8, setMandalartCell8] = useAtom(mandalartCellList[8]);
  const [mandalartCell9, setMandalartCell9] = useAtom(mandalartCellList[9]);
  //10~19
  const [mandalartCell10, setMandalartCell10] = useAtom(mandalartCellList[10]);
  const [mandalartCell11, setMandalartCell11] = useAtom(mandalartCellList[11]);
  const [mandalartCell12, setMandalartCell12] = useAtom(mandalartCellList[12]);
  const [mandalartCell13, setMandalartCell13] = useAtom(mandalartCellList[13]);
  const [mandalartCell14, setMandalartCell14] = useAtom(mandalartCellList[14]);
  const [mandalartCell15, setMandalartCell15] = useAtom(mandalartCellList[15]);
  const [mandalartCell16, setMandalartCell16] = useAtom(mandalartCellList[16]);
  const [mandalartCell17, setMandalartCell17] = useAtom(mandalartCellList[17]);
  const [mandalartCell18, setMandalartCell18] = useAtom(mandalartCellList[18]);
  const [mandalartCell19, setMandalartCell19] = useAtom(mandalartCellList[19]);
  //20~29
  const [mandalartCell20, setMandalartCell20] = useAtom(mandalartCellList[20]);
  const [mandalartCell21, setMandalartCell21] = useAtom(mandalartCellList[21]);
  const [mandalartCell22, setMandalartCell22] = useAtom(mandalartCellList[22]);
  const [mandalartCell23, setMandalartCell23] = useAtom(mandalartCellList[23]);
  const [mandalartCell24, setMandalartCell24] = useAtom(mandalartCellList[24]);
  const [mandalartCell25, setMandalartCell25] = useAtom(mandalartCellList[25]);
  const [mandalartCell26, setMandalartCell26] = useAtom(mandalartCellList[26]);
  const [mandalartCell27, setMandalartCell27] = useAtom(mandalartCellList[27]);
  const [mandalartCell28, setMandalartCell28] = useAtom(mandalartCellList[28]);
  const [mandalartCell29, setMandalartCell29] = useAtom(mandalartCellList[29]);
  //30~39
  const [mandalartCell30, setMandalartCell30] = useAtom(mandalartCellList[30]);
  const [mandalartCell31, setMandalartCell31] = useAtom(mandalartCellList[31]);
  const [mandalartCell32, setMandalartCell32] = useAtom(mandalartCellList[32]);
  const [mandalartCell33, setMandalartCell33] = useAtom(mandalartCellList[33]);
  const [mandalartCell34, setMandalartCell34] = useAtom(mandalartCellList[34]);
  const [mandalartCell35, setMandalartCell35] = useAtom(mandalartCellList[35]);
  const [mandalartCell36, setMandalartCell36] = useAtom(mandalartCellList[36]);
  const [mandalartCell37, setMandalartCell37] = useAtom(mandalartCellList[37]);
  const [mandalartCell38, setMandalartCell38] = useAtom(mandalartCellList[38]);
  const [mandalartCell39, setMandalartCell39] = useAtom(mandalartCellList[39]);
  //40~49
  const [mandalartCell40, setMandalartCell40] = useAtom(mandalartCellList[40]);
  const [mandalartCell41, setMandalartCell41] = useAtom(mandalartCellList[41]);
  const [mandalartCell42, setMandalartCell42] = useAtom(mandalartCellList[42]);
  const [mandalartCell43, setMandalartCell43] = useAtom(mandalartCellList[43]);
  const [mandalartCell44, setMandalartCell44] = useAtom(mandalartCellList[44]);
  const [mandalartCell45, setMandalartCell45] = useAtom(mandalartCellList[45]);
  const [mandalartCell46, setMandalartCell46] = useAtom(mandalartCellList[46]);
  const [mandalartCell47, setMandalartCell47] = useAtom(mandalartCellList[47]);
  const [mandalartCell48, setMandalartCell48] = useAtom(mandalartCellList[48]);
  const [mandalartCell49, setMandalartCell49] = useAtom(mandalartCellList[49]);
  //50~59
  const [mandalartCell50, setMandalartCell50] = useAtom(mandalartCellList[50]);
  const [mandalartCell51, setMandalartCell51] = useAtom(mandalartCellList[51]);
  const [mandalartCell52, setMandalartCell52] = useAtom(mandalartCellList[52]);
  const [mandalartCell53, setMandalartCell53] = useAtom(mandalartCellList[53]);
  const [mandalartCell54, setMandalartCell54] = useAtom(mandalartCellList[54]);
  const [mandalartCell55, setMandalartCell55] = useAtom(mandalartCellList[55]);
  const [mandalartCell56, setMandalartCell56] = useAtom(mandalartCellList[56]);
  const [mandalartCell57, setMandalartCell57] = useAtom(mandalartCellList[57]);
  const [mandalartCell58, setMandalartCell58] = useAtom(mandalartCellList[58]);
  const [mandalartCell59, setMandalartCell59] = useAtom(mandalartCellList[59]);
  //60~69
  const [mandalartCell60, setMandalartCell60] = useAtom(mandalartCellList[60]);
  const [mandalartCell61, setMandalartCell61] = useAtom(mandalartCellList[61]);
  const [mandalartCell62, setMandalartCell62] = useAtom(mandalartCellList[62]);
  const [mandalartCell63, setMandalartCell63] = useAtom(mandalartCellList[63]);
  const [mandalartCell64, setMandalartCell64] = useAtom(mandalartCellList[64]);
  const [mandalartCell65, setMandalartCell65] = useAtom(mandalartCellList[65]);
  const [mandalartCell66, setMandalartCell66] = useAtom(mandalartCellList[66]);
  const [mandalartCell67, setMandalartCell67] = useAtom(mandalartCellList[67]);
  const [mandalartCell68, setMandalartCell68] = useAtom(mandalartCellList[68]);
  const [mandalartCell69, setMandalartCell69] = useAtom(mandalartCellList[69]);
  //70~79
  const [mandalartCell70, setMandalartCell70] = useAtom(mandalartCellList[70]);
  const [mandalartCell71, setMandalartCell71] = useAtom(mandalartCellList[71]);
  const [mandalartCell72, setMandalartCell72] = useAtom(mandalartCellList[72]);
  const [mandalartCell73, setMandalartCell73] = useAtom(mandalartCellList[73]);
  const [mandalartCell74, setMandalartCell74] = useAtom(mandalartCellList[74]);
  const [mandalartCell75, setMandalartCell75] = useAtom(mandalartCellList[75]);
  const [mandalartCell76, setMandalartCell76] = useAtom(mandalartCellList[76]);
  const [mandalartCell77, setMandalartCell77] = useAtom(mandalartCellList[77]);
  const [mandalartCell78, setMandalartCell78] = useAtom(mandalartCellList[78]);
  const [mandalartCell79, setMandalartCell79] = useAtom(mandalartCellList[79]);
  const [mandalartCell80, setMandalartCell80] = useAtom(mandalartCellList[80]);

  const getMandalartCellArrayList = () => {
    return [
      mandalartCell0, mandalartCell1, mandalartCell2, mandalartCell3, mandalartCell4, mandalartCell5, mandalartCell6, mandalartCell7, mandalartCell8, mandalartCell9
      , mandalartCell10, mandalartCell11, mandalartCell12, mandalartCell13, mandalartCell14, mandalartCell15, mandalartCell16, mandalartCell17, mandalartCell18, mandalartCell19
      , mandalartCell20, mandalartCell21, mandalartCell22, mandalartCell23, mandalartCell24, mandalartCell25, mandalartCell26, mandalartCell27, mandalartCell28, mandalartCell29
      , mandalartCell30, mandalartCell31, mandalartCell32, mandalartCell33, mandalartCell34, mandalartCell35, mandalartCell36, mandalartCell37, mandalartCell38, mandalartCell39
      , mandalartCell40, mandalartCell41, mandalartCell42, mandalartCell43, mandalartCell44, mandalartCell45, mandalartCell46, mandalartCell47, mandalartCell48, mandalartCell49
      , mandalartCell50, mandalartCell51, mandalartCell52, mandalartCell53, mandalartCell54, mandalartCell55, mandalartCell56, mandalartCell57, mandalartCell58, mandalartCell59
      , mandalartCell60, mandalartCell61, mandalartCell62, mandalartCell63, mandalartCell64, mandalartCell65, mandalartCell66, mandalartCell67, mandalartCell68, mandalartCell69
      , mandalartCell70, mandalartCell71, mandalartCell72, mandalartCell73, mandalartCell74, mandalartCell75, mandalartCell76, mandalartCell77, mandalartCell78, mandalartCell79
      , mandalartCell80
    ];
  }
  const getSetMandalartCellArrayList = () => {
    return [
      setMandalartCell0, setMandalartCell1, setMandalartCell2, setMandalartCell3, setMandalartCell4, setMandalartCell5, setMandalartCell6, setMandalartCell7, setMandalartCell8, setMandalartCell9
      , setMandalartCell10, setMandalartCell11, setMandalartCell12, setMandalartCell13, setMandalartCell14, setMandalartCell15, setMandalartCell16, setMandalartCell17, setMandalartCell18, setMandalartCell19
      , setMandalartCell20, setMandalartCell21, setMandalartCell22, setMandalartCell23, setMandalartCell24, setMandalartCell25, setMandalartCell26, setMandalartCell27, setMandalartCell28, setMandalartCell29
      , setMandalartCell30, setMandalartCell31, setMandalartCell32, setMandalartCell33, setMandalartCell34, setMandalartCell35, setMandalartCell36, setMandalartCell37, setMandalartCell38, setMandalartCell39
      , setMandalartCell40, setMandalartCell41, setMandalartCell42, setMandalartCell43, setMandalartCell44, setMandalartCell45, setMandalartCell46, setMandalartCell47, setMandalartCell48, setMandalartCell49
      , setMandalartCell50, setMandalartCell51, setMandalartCell52, setMandalartCell53, setMandalartCell54, setMandalartCell55, setMandalartCell56, setMandalartCell57, setMandalartCell58, setMandalartCell59
      , setMandalartCell60, setMandalartCell61, setMandalartCell62, setMandalartCell63, setMandalartCell64, setMandalartCell65, setMandalartCell66, setMandalartCell67, setMandalartCell68, setMandalartCell69
      , setMandalartCell70, setMandalartCell71, setMandalartCell72, setMandalartCell73, setMandalartCell74, setMandalartCell75, setMandalartCell76, setMandalartCell77, setMandalartCell78, setMandalartCell79
      , setMandalartCell80
    ];
  }
  
  /** 達成率の取得 */
  const getTotalAchievementLevel = () => {
    //9*9マスに3レベルまであるとすると(3*81)
    let total = getMandalartCellArrayList().reduce(function(sum, element){
      return sum + element.achievementLevel;
    }, 0);
    let culc = total / (3*81);
    return culc;
  }

  /** マンダラート機能変更 */
  const bottomNavChange = (newValue) => {
    if(isAdmin) return;
    setBottomNavValue(newValue);
    if(newValue === 1){
      setTextFieldDisabled('auto');
    }else{
      setTextFieldDisabled('none');
    }

    if(newValue === 2){
      getMandalart(selectUserId, selectYm, 0);
      setSelectYmFunc(0);
    } else {
      //成長記録→他のタブに移動したときに現在の実績に戻す
      if(bottomNavValue === 2) {
        let mandalartCellArrayList = getMandalartCellArrayList();
        let SetMandalartCellArrayList = getSetMandalartCellArrayList();
        SetMandalartCellArrayList.forEach((setCell, idx) => {
          setCell((oldValue) => ({ ...oldValue, achievementLevel: mandalartCellArrayList[idx].tmpAchievementLevel }));
          setCell((oldValue) => ({ ...oldValue, textFieldValue: mandalartCellArrayList[idx].tmpTextFieldValue }));
        });
      }
    }
  }

  /** 保存処理 */
  const saveExecute = () => {
    setErrorMessage("");
    let sendData = {
      user_id: selectUserId
      , yyyymm: currentYyyymm

    };
    getMandalartCellArrayList().map((cell, idx) => {
      sendData[`achievement_level_${idx}`] = cell.achievementLevel;
      sendData[`target_${idx}`] = cell.textFieldValue;
    });

    setIsLoading(true);

    axios
      .post(API_URL.SAVE_MANDALART, sendData)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setIsSuccess(true);
          getMandalart();
          setTimeout(() => {
            setIsSuccess(false);
            setSaveDialogOpen(false);
          }, "1000");
        }

      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
        setSaveDialogOpen(false);
        return;
      });

  }

  /** 全てのセルをクリア */
  const clearAllExecute = () => {
    let SetMandalartCellArrayList = getSetMandalartCellArrayList();
    SetMandalartCellArrayList.forEach((setCell, idx) => {
      setCell(getObjectCopy(initMandalartCell));
    });
  }

  const [userList, setUserList] = useState([]);

  /** 初期処理 */
  const initFunc = () => {
    clearAllExecute();
    setSelectUserId("");
    setBottomNavValue((isAdmin) ? 2 : 0);
    setSelectYmFunc(0);
    setErrorMessage("");
    setIsSuccess(false);
    setWhenAchievement("");
    getUserList();
  }

  useEffect(() => {
    //読み込み時
    initFunc();
  }, [])

  /** ユーザ一覧取得 */
  const getUserList = () => {
    setErrorMessage("");
    setUserList([]);
    setIsLoading(true);
    axios
      .post(API_URL.GET_USER_LIST, {
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setUserList(response.data);
          setIsLoading(false);
          if(isAdmin){
            
          }else{
            setSelectUserId(userId);
            getMandalart(userId);
          }
        }else{
          return;
        }

      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.message);
        return;
      });
  }

  /** マンダラート取得 */
  const getMandalart = (_userId, _yyyymm, _selectYmFunc) => {
    setErrorMessage("");
    setIsLoading(true);
    const sendUserId = (_userId) ? _userId : selectUserId;
    const sendYyyymm = (_yyyymm) ? _yyyymm : false;
    const sendSelectYmFunc = (!isNull(_selectYmFunc)) ? _selectYmFunc : selectYmFunc;
    return axios
      .post(API_URL.GET_MANDALART, {
        user_id: sendUserId
      , yyyymm: sendYyyymm
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          let SetMandalartCellArrayList = getSetMandalartCellArrayList();
          if(!sendYyyymm) {
            SetMandalartCellArrayList.map((setCell, idx) => {
              let cell = getObjectCopy(initMandalartCell);

              cell["key"] = response.data[`key`];
              cell["achievementLevel"] = response.data[`achievement_level_${idx}`];
              cell["textFieldValue"] = response.data[`target_${idx}`];
              cell["tmpAchievementLevel"] = response.data[`achievement_level_${idx}`];
              cell["tmpTextFieldValue"] = response.data[`target_${idx}`];

              setCell(cell);
            });
            setWhenAchievement(format(MESSAGE.WHEN_ACHIEVEMENT, response.data.yyyymm));
            setWhenData(response.data.yyyymm);
            setTargetMessage("");
            //bottomNavChange(0);
          } else {
            //年月比較でマンダラート取得したパターン
            let mandalartCellArrayList = getMandalartCellArrayList();
            SetMandalartCellArrayList.forEach((setCell, idx) => {
              if(mandalartCellArrayList[idx].achievementLevel !== response.data[`achievement_level_${idx}`]){
                setCell((oldValue) => ({ ...oldValue, isGrow: true }));
              } else {
                setCell((oldValue) => ({ ...oldValue, isGrow: false }));
              }
              setCell((oldValue) => ({ ...oldValue, compareAchievementLevel: response.data[`achievement_level_${idx}`] }));
              setCell((oldValue) => ({ ...oldValue, compareTextFieldValue: response.data[`target_${idx}`] }));
              //表示押下
              if(sendSelectYmFunc === 1){
                setCell((oldValue) => ({ ...oldValue, achievementLevel: response.data[`achievement_level_${idx}`] }));
                setCell((oldValue) => ({ ...oldValue, textFieldValue: response.data[`target_${idx}`] }));
                setCell((oldValue) => ({ ...oldValue, isGrow: false }));
              } else {
                //比較を押下したとき、比較すべき最新データはtmp○○に入っている
                if(mandalartCellArrayList[idx].achievementLevel !== mandalartCellArrayList[idx].tmpAchievementLevel){
                  setCell((oldValue) => ({ ...oldValue, isGrow: true }));
                }
                setCell((oldValue) => ({ ...oldValue, achievementLevel: mandalartCellArrayList[idx].tmpAchievementLevel }));
                setCell((oldValue) => ({ ...oldValue, textFieldValue: mandalartCellArrayList[idx].tmpTextFieldValue }));
              }
            });
          }
        }else{
          return;
        }

      })
      .catch((error) => {
        setIsLoading(false);
        //データなしは正常として扱う
        if(error.response?.status === 404){
          if(!sendYyyymm) {
            clearAllExecute();
            setTargetMessage(MESSAGE.TARGET_MESSAGE);
            setWhenAchievement("");
            setWhenData(MESSAGE.INPUT_YET);
            //bottomNavChange(1);
          } else {
            let SetMandalartCellArrayList = getSetMandalartCellArrayList();
            SetMandalartCellArrayList.forEach((setCell, idx) => {
              setCell((oldValue) => ({ ...oldValue, isGrow: false }));
              setCell((oldValue) => ({ ...oldValue, compareAchievementLevel: 0 }));
              setCell((oldValue) => ({ ...oldValue, compareTextFieldValue: "" }));
              //表示押下
              if(sendSelectYmFunc === 1){
                setCell((oldValue) => ({ ...oldValue, achievementLevel: 0 }));
                setCell((oldValue) => ({ ...oldValue, textFieldValue: "" }));
              }
            });
          }
        } else {
          setErrorMessage(error.message);
        }
        return;
      });
  }

  /** 選択ユーザ変更 */
  const selectUserIdChange = (e) => {
    setSelectUserId(e.target.value);
    let _yyyymm = false;
    //成長記録が選択　かつ　表示タブが押下されている　かつ　比較する年月が選択されている　なら比較する年月のデータを取得
    if(bottomNavValue === 2 && selectYmFunc === 1 && selectYm !== ""){
      _yyyymm = selectYm;
    }
    //管理者は最新の実績と比較する年月を取得する
    if(isAdmin){
      getMandalart(e.target.value)
      .then((response) => {
        getMandalart(e.target.value, _yyyymm)
      });
    } else {
      getMandalart(e.target.value, _yyyymm);
    }
    
  }

  /** 選択年月変更 */
  const selectYmChange = (e) => {
    setSelectYm(e.target.value);
    getMandalart(selectUserId, e.target.value);
  }

  /** 選択年月機能変更 */
  const selectYmFuncChange = (e, newAlignment) => {
    if(newAlignment !== null) {
      setSelectYmFunc(newAlignment);
      getMandalart(selectUserId, selectYm, newAlignment);
    }
  }

  return (
    <div className="wrapper">
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Progress/>
        <ErrorMessage />
        <SuccessMessage />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Grid container spacing={2}>
            <Box
              sx={{
                width: AdjustWidth,
                display: 'flex',
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="select-user-label">{MESSAGE.SELECT_USER_LABEL}</InputLabel>
                <Select
                  labelId="select-user-label"
                  id="select-user"
                  label={MESSAGE.SELECT_USER_LABEL}
                  onChange={selectUserIdChange}
                  value={selectUserId}
                  disabled={!isAdmin}
                >
                  {userList.map((user) => {
                    return (
                      <MenuItem key={user.user_id} value={user.user_id}>{user.user_name}</MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
            </Box>
            <FormControl sx={{ m: 1 }} size="small">
              {bottomNavValue === 2
              ?
              <div>
              <InputLabel 
                id="select-ym-label"
                error={(selectYmFunc !== 0)}
              >
                  {(selectYmFunc === 0) ? MESSAGE.SELECT_YM_LABEL : MESSAGE.SELECT_YM_LABEL2}
              </InputLabel>
              <Select
                labelId="select-ym-label"
                id="select-ym"
                label={MESSAGE.SELECT_YM_LABEL}
                onChange={selectYmChange}
                value={selectYm}
              >
                {SELECT_YYYY_LIST.map((yyyy, yyyy_idx) => (
                    Array(12).fill(0).map((val, i) => {
                      const ym = yyyy + "/" + (i+1).toString().padStart( 2, '0');
                      return (
                        <MenuItem value={ym}>{yyyy}年{i+1}月</MenuItem>
                      );
                    })
                ))}
              </Select>
              </div>
              :
              ""
              }
            </FormControl>
            
            <FormControl className="toggle-button" sx={{ m: 1 }} size="small">
              {bottomNavValue === 2
              ?
              <ToggleButtonGroup
                color="primary"
                value={selectYmFunc}
                exclusive
                onChange={selectYmFuncChange}
                aria-label="Platform"
              >
                <ToggleButton value={0}>{MESSAGE.COMPARE}</ToggleButton>
                <ToggleButton value={1}>{MESSAGE.SHOW}</ToggleButton>
              </ToggleButtonGroup>
              :
              ""
              }
            </FormControl>
            <Logout />
          </Grid>
        </Box>

        <BottomNav bottomNavChange={bottomNavChange}/>
        <Box
          sx={{
            marginTop: 2,
          }}
        ></Box>
        <Box
          id="WholeMandalart"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MandalartCellRow rowIndex={0} />
          <MandalartCellRow rowIndex={1} />
          <MandalartCellRow rowIndex={2} />
          <MandalartCellRow rowIndex={3} />
          <MandalartCellRow rowIndex={4} />
          <MandalartCellRow rowIndex={5} />
          <MandalartCellRow rowIndex={6} />
          <MandalartCellRow rowIndex={7} />
          <MandalartCellRow rowIndex={8} />
        </Box>
        {!isAdmin
        ?
          <BasicSpeedDial 
            clearAllExecute={clearAllExecute}
            saveExecute={saveExecute}
            element={document.getElementById("WholeMandalart")}
          />
        :
          ""
        }
      </Container>
      <ExplanatoryNote />
      <AchievementGauge  getTotalAchievementLevel={getTotalAchievementLevel} />
    </ThemeProvider>
  </div>
  );
}

export default Top;
