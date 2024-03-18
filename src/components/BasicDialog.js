import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom } from 'jotai';
import { MESSAGE } from './../components/Const';
import { translateNewLine } from './CommonFunc';

import { 
  clearAllDialogOpenAtom
  , saveDialogOpenAtom
   } from './../components/Atoms';

const BasicDialog = (props) => {
  const [clearAllDialogOpen, setClearAllDialogOpen] = useAtom(clearAllDialogOpenAtom);
  const [saveDialogOpen, setSaveDialogOpen] = useAtom(saveDialogOpenAtom);

  const handleAgree = () => {
    props.agreeFunc();
    if(props.dialogKind === "clearAllDialog"){
      setClearAllDialogOpen(false);
    } else {
      setSaveDialogOpen(false);
    }
  };

  const handleDisagree = () => {
    if(props.dialogKind === "clearAllDialog"){
      setClearAllDialogOpen(false);
    } else {
      setSaveDialogOpen(false);
    }
  };

  return (
      <Dialog
        open={(props.dialogKind === "clearAllDialog") ? clearAllDialogOpen : saveDialogOpen}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {translateNewLine(props.content)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>{MESSAGE.CANCEL}</Button>
          <Button onClick={handleAgree} autoFocus>
            {MESSAGE.EXECUTE}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
export default BasicDialog;