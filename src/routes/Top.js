import '../App.css';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useAtom } from 'jotai';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { AUTHOR, MESSAGE, API_URL, SELECT_YYYY_LIST, ROLE, THEME } from './../components/Const';
import { isNullOrEmpty, getSession } from './../components/CommonFunc';
import { addMonthDateToYM } from './../components/FormatDate';

import Progress from './../components/Progress';
import MandalartCellRow from './../components/MandalartCellRow';
import BottomNav from './../components/BottomNav';
import ErrorMessage from './../components/ErrorMessage';
import Logout from './../components/Logout';
import BasicSpeedDial from './../components/BasicSpeedDial';

import { 
  isLoadingAtom
  , loggedInAtom
  , selectYmFuncAtom
  , textFieldDisabledAtom
  , bottomNavValueAtom
  , mandalartCellListAtomsAtom
  , errorMessageAtom
   } from './../components/Atoms';

function Top() {
  const defaultTheme = createTheme(THEME);

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  const [selectUser, setSelectUser] = useState("");
  const [selectYm, setSelectYm] = useState(addMonthDateToYM(new Date(), -1));
  const [isAdmin, setIsAdmin] = useState((getSession().role_id === ROLE.ADMIN) ? true : false);
  const [userId, setUserId] = useState(getSession().user_id);

  const [selectYmFunc, setSelectYmFunc] = useAtom(selectYmFuncAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);

  const [mandalartCellList, setMandalartCellList] = useAtom(mandalartCellListAtomsAtom);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    //読み込み時オフィス一覧を取得する
    getUserList();
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
            setSelectUser(userId);
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

  /** 選択ユーザ変更 */
  const selectUserChange = (e) => {
    setSelectUser(e.target.value);
  }

  /** 選択年月変更 */
  const selectYmChange = (e) => {
    setSelectYm(e.target.value);
  }

  /** 選択年月機能変更 */
  const selectYmFuncChange = (e, newAlignment) => {
    setSelectYmFunc(newAlignment);
  }

  return (
    <div className="wrapper">
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Progress/>
        <ErrorMessage />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Grid container spacing={2}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-user-label">ユーザ選択</InputLabel>
              <Select
                labelId="select-user-label"
                id="select-user"
                label="ユーザ選択"
                onChange={selectUserChange}
                value={selectUser}
                disabled={!isAdmin}
              >
                {userList.map((user) => {
                  return (
                    <MenuItem key={user.user_id} value={user.user_id}>{user.user_name}</MenuItem>
                    );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-ym-label">年月選択</InputLabel>
              <Select
                labelId="select-ym-label"
                id="select-ym"
                label="年月選択"
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
            </FormControl>
            <FormControl className="toggle-button" sx={{ m: 1, minWidth: 120 }} size="small">
              <ToggleButtonGroup
                color="primary"
                value={selectYmFunc}
                exclusive
                onChange={selectYmFuncChange}
                aria-label="Platform"
              >
                <ToggleButton value={0}>比較</ToggleButton>
                <ToggleButton value={1}>表示</ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          
            <Logout />
          </Grid>
        </Box>

        <BottomNav />
        <Box
          sx={{
            marginTop: 2,
          }}
        ></Box>
        <Box
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
        <BasicSpeedDial />
      </Container>
    </ThemeProvider>
  </div>
  );
}

export default Top;
