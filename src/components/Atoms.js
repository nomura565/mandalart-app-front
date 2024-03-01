import { atom } from 'jotai'
import { splitAtom } from 'jotai/utils'
import { getObjectCopy } from './CommonFunc'

export const isLoadingAtom = atom(false);
export const loggedInAtom = atom(false);
export const selectYmFuncAtom = atom(0);
export const bottomNavValueAtom = atom(0);
export const textFieldDisabledAtom = atom('none');
export const errorMessageAtom = atom('none');

export const initMandalartCell = {
  key: ''
  , isAchievement: false
  , textFieldValue: ''
};

let mandalartCellList = [];

for (let i = 0; i < 81; i++) {
  let tmp = getObjectCopy(initMandalartCell);
  tmp.textFieldValue = i;

  mandalartCellList.push(tmp);
}

const mandalartCellListAtom = atom(mandalartCellList);
export const mandalartCellListAtomsAtom = splitAtom(mandalartCellListAtom);