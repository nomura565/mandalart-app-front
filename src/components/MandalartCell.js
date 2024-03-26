import TextField from '@mui/material/TextField';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { 
  textFieldDisabledAtom
  , bottomNavValueAtom
  , mandalartCellListAtomsAtom
  , selectYmFuncAtom
   } from './../components/Atoms';

const MandalartCell = (props) => {

  let syncCellIdx = 0;
  let isSync = false;
  switch (props.idx) {
    case 10:
      syncCellIdx = 30;
      break;
    case 13:
      syncCellIdx = 31;
      break;
    case 16:
      syncCellIdx = 32;
      break;
    case 30:
      syncCellIdx = 10;
      break;
    case 31:
      syncCellIdx = 13;
      break;
    case 32:
      syncCellIdx = 16;
      break;
    case 37:
      syncCellIdx = 39;
      break;
    case 39:
      syncCellIdx = 37;
      break;
    case 41:
      syncCellIdx = 43;
      break;
    case 43:
      syncCellIdx = 41;
      break;
    case 48:
      syncCellIdx = 64;
      break;
    case 49:
      syncCellIdx = 67;
      break;
    case 50:
      syncCellIdx = 70;
      break;
    case 64:
      syncCellIdx = 48;
      break;
    case 67:
      syncCellIdx = 49;
      break;
    case 70:
      syncCellIdx = 50;
      break;
    default:
      break;
  }

  let isLeft = false;
  let isTop = false;
  let isRight = false;
  let isBottom = false;
  if(props.idx >= 0 && props.idx <= 8) {
      isTop = true;
  }
  if((props.idx >= 18 && props.idx <= 26) 
    || (props.idx >= 45 && props.idx <= 53)
    || (props.idx >= 72 && props.idx <= 80)
  ){
    isBottom = true;
  }
  if(props.idx % 3 === 0) {
    isLeft = true;
  }
  if(props.idx % 3 === 2) {
    isRight = true;
  }

  const bottomNavValue = useAtomValue(bottomNavValueAtom);
  const textFieldDisabled = useAtomValue(textFieldDisabledAtom);
  const mandalartCellList = useAtomValue(mandalartCellListAtomsAtom);
  const [mandalartCell, setMandalartCell] = useAtom(mandalartCellList[props.idx]);
  const setSyncMandalartCell = useSetAtom(mandalartCellList[syncCellIdx]);
  const selectYmFunc = useAtomValue(selectYmFuncAtom);

  let cellClass = "mandalart-cell";
  if(isTop) cellClass = `${cellClass} mandalart-cell-top`;
  if(isBottom) cellClass = `${cellClass} mandalart-cell-bottom`;
  if(isLeft) cellClass = `${cellClass} mandalart-cell-left`;
  if(isRight) cellClass = `${cellClass} mandalart-cell-right`;

  const centerCellClass = `${cellClass} center-cell`;
  //比較してレベルが違うセルを点滅させるのは以下の時
  //比較してレベルが違う
  //成長記録タブが押下されている
  //比較タブが押下されている
  let achievementCellClass = (mandalartCell.isGrow && bottomNavValue === 2 && selectYmFunc === 0) ? cellClass + " achievement-cell-grow-level-" : cellClass + " achievement-cell-level-";

  if(syncCellIdx !== 0) isSync = true;

  /** セルクラス取得 */
  const getCellClass= () => {
    const defaultClass = (props.isCenter ) ? centerCellClass : cellClass;
    let afterClass = achievementCellClass + mandalartCell.achievementLevel;
    if(bottomNavValue == 0) afterClass = afterClass + " mandalart-cell-pointer";

    if(mandalartCell.achievementLevel === 0){
      afterClass = defaultClass;
    }
    return afterClass;
  }
  /** マンダラート機能変更 */
  const backGroundColorChange = () => {
    if(bottomNavValue === 0){
      const nextAchievementLevel = (mandalartCell.achievementLevel === 3) ? 0 : mandalartCell.achievementLevel + 1;
      setMandalartCell((oldValue) => ({ ...oldValue, achievementLevel: nextAchievementLevel }));
      setMandalartCell((oldValue) => ({ ...oldValue, tmpAchievementLevel: nextAchievementLevel }));
      if(isSync){
        setSyncMandalartCell((oldValue) => ({ ...oldValue, achievementLevel: nextAchievementLevel }));
        setSyncMandalartCell((oldValue) => ({ ...oldValue, tmpAchievementLevel: nextAchievementLevel }));
      }
    }
  }

  /* テキストフィールド変更 */
  const textFieldChange = (e) => {
    setMandalartCell((oldValue) => ({ ...oldValue, textFieldValue: e.target.value }));
    setMandalartCell((oldValue) => ({ ...oldValue, tmpTextFieldValue: e.target.value }));
    if(isSync){
      setSyncMandalartCell((oldValue) => ({ ...oldValue, textFieldValue: e.target.value }));
      setSyncMandalartCell((oldValue) => ({ ...oldValue, tmpTextFieldValue: e.target.value }));
    }
  };
  
  return (
    <div onClick={backGroundColorChange}>
    <TextField
      className={getCellClass()}
      multiline
      rows={3}
      value={mandalartCell.textFieldValue}
      sx={{ pointerEvents:textFieldDisabled }}
      onChange={textFieldChange}
    />
    </div>
   );
}

export default MandalartCell;