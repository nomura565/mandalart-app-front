import { atom } from 'jotai'
import { splitAtom } from 'jotai/utils'
import { getObjectCopy } from './CommonFunc'
import { addMonthDateToYM } from './FormatDate';

export const isLoadingAtom = atom(false);
export const loggedInAtom = atom(false);
export const selectYmFuncAtom = atom(0);
export const bottomNavValueAtom = atom(0);
export const textFieldDisabledAtom = atom('none');
export const errorMessageAtom = atom("");
export const successMessageAtom = atom("");
export const achievementGaugeValueAtom = atom(0);

export const clearAllDialogOpenAtom = atom(false);
export const saveDialogOpenAtom = atom(false);
export const selectUserIdAtom = atom("");
export const whenAchievementAtom = atom("");
export const whenDataAtom = atom("");
export const targetMessageAtom = atom("");
export const selectYmAtom = atom(addMonthDateToYM(new Date(), -1));

export const initMandalartCell = {
  key: ''
  , achievementLevel: 0
  , textFieldValue: ''
  , yyyymm: ''
  , isGrow: false
  , compareAchievementLevel: 0
  , compareTextFieldValue: ''
  , compareYyyymm: ''
  , tmpAchievementLevel: 0
  , tmpTextFieldValue: ''
  , tmpYyyymm: ''
};

let mandalartCellList = [];
let initMandalartCellList = [];

for (let i = 0; i < 81; i++) {
  let tmp = getObjectCopy(initMandalartCell);
  tmp.key = i;
  //tmp.textFieldValue = i;

  mandalartCellList.push(tmp);

  let tmp2 = getObjectCopy(initMandalartCell);
  initMandalartCellList.push(tmp2);
}

const mandalartCellListAtom = atom(mandalartCellList);
export const mandalartCellListAtomsAtom = splitAtom(mandalartCellListAtom);
const initMandalartCellListAtom = atom(initMandalartCellList);
export const initMandalartCellListAtomsAtom = splitAtom(initMandalartCellListAtom);