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
import { MESSAGE, API_URL } from './../components/Const';

import { 
  checkListDialogOpenAtom
  , isLoadingAtom
  , errorMessageAtom
   } from './../components/Atoms';

const CheckListDialog = (props) => {
  const [checkListDialogOpen, setCheckListDialogOpen] = useAtom(checkListDialogOpenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
      if(checkListDialogOpen){
        getCheckList();
      }
  }, [checkListDialogOpen]);

  const handleDisagree = () => {
    setCheckListDialogOpen(false);
  };

  /** チェックリスト取得 */
  const getCheckList = () => {
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
        }else{
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

  return (
      <Dialog
        open={checkListDialogOpen}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {MESSAGE.ACHIEVEMENT_STATUS}
        </DialogTitle>
        <DialogContent>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{MESSAGE.USER_NAME}</TableCell>
                  <TableCell align="right">{MESSAGE.MAX_YYYYMM}</TableCell>
                  <TableCell align="right">{MESSAGE.ACHIEVEMENT_GAUGE_VALUE}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkList.map((row) => (
                  <TableRow
                    key={row.user_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.user_name}</TableCell>
                    <TableCell align="right">{row.max_yyyymm}</TableCell>
                    <TableCell align="right">{row.achievement_gauge_value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
  );
}
export default CheckListDialog;