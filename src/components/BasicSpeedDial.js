import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useAtom } from 'jotai';
import BasicDialog from './BasicDialog';
import { MESSAGE } from './../components/Const';
import { format } from 'react-string-format';
import { formatDateToYM } from './../components/FormatDate';

import { 
  clearAllDialogOpenAtom
  , saveDialogOpenAtom
   } from './../components/Atoms';

const BasicSpeedDial = (props) => {

  const [clearAllDialogOpen, setClearAllDialogOpen] = useAtom(clearAllDialogOpenAtom);
  const [saveDialogOpen, setSaveDialogOpen] = useAtom(saveDialogOpenAtom);

  /** 保存ダイアログオープン */
  const saveDialogOpenExecute = () => {
    setSaveDialogOpen(true);
  }

  /** オールクリアダイアログオープン */
  const clearAllDialogOpenExecute = () => {
    setClearAllDialogOpen(true);
  }

  const yyyymm = formatDateToYM(new Date());

  const actions = [
    { icon: <ClearAllIcon />, name: MESSAGE.CLEAR_ALL_SPEED_DIAL, onClick:clearAllDialogOpenExecute },
    { icon: <SaveIcon />, name: format(MESSAGE.SAVE_SPEED_DIAL, yyyymm), onClick:saveDialogOpenExecute },
  ];
  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic"
        sx={{ position: 'fixed'
        , bottom: 5
        , right: 0 
        , top:'auto' }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      <BasicDialog 
        open={clearAllDialogOpen}
        agreeFunc={props.clearAllExecute}
        dialogKind="clearAllDialog"
        title={MESSAGE.CLEAR_ALL_DIALOG_TITLE}
        content={MESSAGE.CLEAR_ALL_DIALOG_CONTENT}
      />
      <BasicDialog 
        open={saveDialogOpen}
        agreeFunc={props.saveExecute}
        dialogKind="saveDialog"
        title={MESSAGE.SAVE_DIALOG_TITLE}
        content={format(MESSAGE.SAVE_DIALOG_CONTENT, yyyymm)}
      />
    </Box>
  );
}
export default BasicSpeedDial;