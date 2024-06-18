import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom, useSetAtom } from 'jotai';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TimelineIcon from '@mui/icons-material/Timeline';
import IconButton from '@mui/material/IconButton';
import { MESSAGE, API_URL, SELECT_YYYY_LIST } from './../components/Const';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LineChart } from '@mui/x-charts/LineChart';
import { isNull } from './../components/CommonFunc';
import { formatDateToYY } from './../components/FormatDate';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {
  checkListDialogOpenAtom
  , isLoadingAtom
  , errorMessageAtom
  , departmentListAtom
} from './../components/Atoms';

const CheckListDialog = (props) => {
  const [checkListDialogOpen, setCheckListDialogOpen] = useAtom(checkListDialogOpenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [checkList, setCheckList] = useState([]);
  const [acheivementList, setAcheivementList] = useState([]);
  const [isGraph, setIsGraph] = useState(false);
  const [selectUserId, setSelectUserId] = useState("");
  const [selectYy, setSelectYy] = useState(formatDateToYY(new Date()));
  const [departmentList, setDepartmentList] = useAtom(departmentListAtom);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (checkListDialogOpen) {
      getCheckList();
    }
  }, [checkListDialogOpen]);

  const handleDisagree = () => {
    setCheckListDialogOpen(false);
  };

  const departmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const graphOpen = (user_id) => {
    setIsGraph(true);
    setSelectUserId(user_id);
    const defaultYy = formatDateToYY(new Date());
    setSelectYy(defaultYy);
    getAcheivementList(user_id, defaultYy);
  };

  const graphClose = () => {
    setIsGraph(false);
  };

  /** チェックリスト取得 */
  const getCheckList = () => {
    setIsGraph(false);
    setErrorMessage("");
    setCheckList([]);
    setIsLoading(true);
    axios
      .post(API_URL.GET_CHECK_LIST, {
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setCheckList(response.data);
          setIsLoading(false);
        } else {
          return;
        }

      })
      .catch((error) => {
        setIsLoading(false);
        setCheckListDialogOpen(false);
        setErrorMessage(error.message);
        return;
      });
  }

  /** 達成率リスト取得 */
  const getAcheivementList = (_user_id, _select_yy) => {
    setErrorMessage("");
    setAcheivementList([]);
    setIsLoading(true);
    const sendSelectUserId = (!isNull(_user_id)) ? _user_id : selectUserId;
    const sendSelectYy = (!isNull(_select_yy)) ? _select_yy : selectYy;
    axios
      .post(API_URL.GET_ACHIEVEMENT_LIST, {
        user_id: sendSelectUserId,
        yyyy: sendSelectYy
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          setAcheivementList(response.data);
          setIsLoading(false);
        } else {
          return;
        }

      })
      .catch((error) => {
        setIsLoading(false);
        //結果無しは正常
        if (error.response?.status !== 404) {
          setCheckListDialogOpen(false);
          setErrorMessage(error.message);
        }
        return;
      });
  }

  /** 年変更時 */
  const selectYyChange = (e) => {
    setSelectYy(e.target.value);
    getAcheivementList(selectUserId, e.target.value);
  }
  /** ユーザ名変更時 */
  const onClickUserName = (user_id) => {
    setCheckListDialogOpen(false);
    props.departmentChange("");
    props.selectUserIdChange(user_id);
  }

  const rateFormatter = (value) => (isNull(value)) ? "" : value + "%";

  return (
    <Dialog
      open={checkListDialogOpen}
      onClose={handleDisagree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {MESSAGE.ACHIEVEMENT_STATUS}
      </DialogTitle>
      {isGraph
        ?
        <DialogContent sx={{
          minHeight: "400px"
        }}>
          <Grid container spacing={2}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '85px',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <FormControl sx={{ m: 1, flexDirection: 'column' }} size="small">
                <IconButton
                  sx={{
                    cursor: "pointer",
                    padding: "0px"
                  }}
                  onClick={graphClose}
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </FormControl>
              <FormControl sx={{ m: 1, flexDirection: 'column' }} size="small">
                <InputLabel
                  id="select-yy-label"
                >
                  {MESSAGE.SELECT_YY_LABEL}
                </InputLabel>
                <Select
                  labelId="select-yy-label"
                  id="select-yy"
                  label={MESSAGE.SELECT_YY_LABEL}
                  onChange={selectYyChange}
                  value={selectYy}
                >
                  {SELECT_YYYY_LIST.map((yyyy, yyyy_idx) => {
                    return (
                      <MenuItem key={yyyy} value={yyyy}>{yyyy}年</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              }
            ]}
            yAxis={[
              {
                max: 100,
                min: 0,
                valueFormatter: rateFormatter,
              }
            ]}
            series={[
              {
                data: acheivementList,
                label: MESSAGE.ACHIEVEMENT_GAUGE_VALUE,
                connectNulls: true,
                valueFormatter: rateFormatter,
              },
            ]}
            width={500}
            height={300}
          />
        </DialogContent>
        :
        <DialogContent sx={{
          minHeight: "400px"
        }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel
              id="select-department-label"
            >
              {MESSAGE.DEPARTMENT}
            </InputLabel>
            <Select
              labelId="select-department-label"
              label={MESSAGE.DEPARTMENT}
              onChange={departmentChange}
              value={department}
            >
              <MenuItem value="">
                {MESSAGE.NO_SELECT}
              </MenuItem>
              {departmentList.map((department) => (
                <MenuItem key={department.department_id} value={department.department_id}>
                  {department.department_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>{MESSAGE.DEPARTMENT}</TableCell>
                  <TableCell>{MESSAGE.USER_NAME}</TableCell>
                  <TableCell align="right">{MESSAGE.MAX_YYYYMM}</TableCell>
                  <TableCell align="right">{MESSAGE.UPDATE_DATE}</TableCell>
                  <TableCell align="right">{MESSAGE.ACHIEVEMENT_GAUGE_VALUE}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkList.filter(row => {
                  if (department !== "") {
                    return (row.department_id === department);
                  } else {
                    return row;
                  }
                }).map((row) => (
                  <TableRow
                    key={row.user_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <IconButton
                        sx={{
                          cursor: "pointer",
                          padding: "0px"
                        }}
                        onClick={() => graphOpen(row.user_id)}
                      >
                        <TimelineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.department_name}</TableCell>
                    <TableCell><a href="#" onClick={(user_id) => onClickUserName(row.user_id)}>{row.user_name}</a></TableCell>
                    <TableCell align="right">{row.max_yyyymm}</TableCell>
                    <TableCell align="right">{row.update_date}</TableCell>
                    <TableCell align="right">{row.achievement_gauge_value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      }
    </Dialog>
  );
}
export default CheckListDialog;