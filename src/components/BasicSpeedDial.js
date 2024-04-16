import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useSetAtom, useAtomValue } from 'jotai';
import BasicDialog from './BasicDialog';
import { MESSAGE, ROLE } from './../components/Const';
import { format } from 'react-string-format';
import { formatDateToYM } from './../components/FormatDate';
import html2canvas from 'html2canvas';
import { getSession } from './../components/CommonFunc';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpDialog from './HelpDialog';

import {
  clearAllDialogOpenAtom
  , saveDialogOpenAtom
  , whenDataAtom
  , bottomNavValueAtom
  , selectYmFuncAtom
  , selectYmAtom
  , helpDialogOpenAtom
} from './../components/Atoms';

const BasicSpeedDial = (props) => {

  const setClearAllDialogOpen = useSetAtom(clearAllDialogOpenAtom);
  const setSaveDialogOpen = useSetAtom(saveDialogOpenAtom);
  const setHelpDialogOpen = useSetAtom(helpDialogOpenAtom);
  const [isAdmin] = useState((getSession().role_id === ROLE.ADMIN) ? true : false);
  const whenData = useAtomValue(whenDataAtom);
  const bottomNavValue = useAtomValue(bottomNavValueAtom);
  const selectYmFunc = useAtomValue(selectYmFuncAtom);
  const selectYm = useAtomValue(selectYmAtom);

  /** 保存ダイアログオープン */
  const saveDialogOpenExecute = () => {
    setSaveDialogOpen(true);
  }

  /** オールクリアダイアログオープン */
  const clearAllDialogOpenExecute = () => {
    setClearAllDialogOpen(true);
  }

  /** ヘルプダイアログオープン */
  const helpDialogOpenExecute = () => {
    setHelpDialogOpen(true);
  }

  /** 画像出力 */
  const outputExecute = () => {
    const target = props.element;
    html2canvas(target).then(canvas => {
      const targetImgUri = canvas.toDataURL("img/png");
      saveAsImage(targetImgUri);
    });
  }

  const saveAsImage = uri => {
    const downloadLink = document.createElement("a");

    if (typeof downloadLink.download === "string") {
      downloadLink.href = uri;

      // ファイル名
      let fileNm = whenData;
      //成長記録タブ押下、表示押下時は表示中の年月のデータ
      if (bottomNavValue === 2 && selectYmFunc === 1) {
        fileNm = selectYm;
      }

      downloadLink.download = format(MESSAGE.OUTPUT_FILE_NAME, fileNm);
      // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
      document.body.appendChild(downloadLink);
      // ダウンロードリンクが設定された a タグをクリック
      downloadLink.click();
      // Firefox 対策で追加したリンクを削除しておく
      document.body.removeChild(downloadLink);
    } else {
      window.open(uri);
    }
  }

  const yyyymm = formatDateToYM(new Date());

  let actions = [
    { adminUse: false, icon: <SaveIcon color='primary' />, name: format(MESSAGE.SAVE_SPEED_DIAL, yyyymm), onClick: saveDialogOpenExecute },
    { adminUse: true, icon: <CameraAltIcon />, name: MESSAGE.OUTPUT_SPEED_DIAL, onClick: outputExecute },
    { adminUse: false, icon: <DeleteIcon color='error' />, name: MESSAGE.CLEAR_ALL_SPEED_DIAL, onClick: clearAllDialogOpenExecute },
    { adminUse: true, icon: <HelpOutlineIcon />, name: MESSAGE.HELP, onClick: helpDialogOpenExecute },
  ];

  if (isAdmin) {
    actions = actions.filter(action => action.adminUse);
  }

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic"
        sx={{
          position: 'fixed'
          , bottom: 5
          , right: 0
          , top: 'auto'
        }}
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
        agreeFunc={props.clearAllExecute}
        dialogKind="clearAllDialog"
        title={MESSAGE.CLEAR_ALL_DIALOG_TITLE}
        content={MESSAGE.CLEAR_ALL_DIALOG_CONTENT}
      />
      <BasicDialog
        agreeFunc={props.saveExecute}
        dialogKind="saveDialog"
        title={MESSAGE.SAVE_DIALOG_TITLE}
        content={format(MESSAGE.SAVE_DIALOG_CONTENT, yyyymm)}
      />
      <HelpDialog />
    </Box>
  );
}
export default BasicSpeedDial;