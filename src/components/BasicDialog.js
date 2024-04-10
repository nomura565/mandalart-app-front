import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom, useAtomValue } from 'jotai';
import { MESSAGE } from './../components/Const';
import { translateNewLine } from './CommonFunc';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

import {
  clearAllDialogOpenAtom
  , saveDialogOpenAtom
  , isLoadingAtom
  , isSuccessAtom
} from './../components/Atoms';

const BasicDialog = (props) => {
  const [clearAllDialogOpen, setClearAllDialogOpen] = useAtom(clearAllDialogOpenAtom);
  const [saveDialogOpen, setSaveDialogOpen] = useAtom(saveDialogOpenAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const isSuccess = useAtomValue(isSuccessAtom);

  const handleAgree = () => {
    props.agreeFunc();
    if (props.dialogKind === "clearAllDialog") {
      setClearAllDialogOpen(false);
    }
  };

  const handleDisagree = () => {
    if (props.dialogKind === "clearAllDialog") {
      setClearAllDialogOpen(false);
    } else {
      setSaveDialogOpen(false);
    }
  };

  const executeButton = () => {
    if (isLoading) {
      return <CircularProgress size={30} />;
    } else {
      if (isSuccess) {
        return <CheckIcon color="success" />;
      } else {
        return <Button
          onClick={handleAgree}
          autoFocus
          disabled={isLoading}
        >
          {MESSAGE.EXECUTE}
        </Button>;
      }
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
        <Button
          onClick={handleDisagree}
          disabled={isLoading}
        >
          {MESSAGE.CANCEL}
        </Button>
        {executeButton()}
      </DialogActions>
    </Dialog>
  );
}
export default BasicDialog;