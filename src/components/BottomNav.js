import DrawIcon from '@mui/icons-material/Draw';
import PaletteIcon from '@mui/icons-material/Palette';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAtom } from 'jotai';

import { 
  bottomNavValueAtom
  , textFieldDisabledAtom
   } from './../components/Atoms';

const BottomNav = (props) => {
  const [bottomNavValue, setBottomNavValue] = useAtom(bottomNavValueAtom);
  const [textFieldDisabled, setTextFieldDisabled] = useAtom(textFieldDisabledAtom);

  /** マンダラート機能変更 */
  const bottomNavChange = (e, newValue) => {
    setBottomNavValue(newValue);
    if(newValue === 1){
      setTextFieldDisabled('auto');
    }else{
      setTextFieldDisabled('none');
    }
  }

  return (
    <Paper elevation={3}>
      <Box >
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={bottomNavChange}
        >
          <BottomNavigationAction label="実績入力" icon={<PaletteIcon />} />
          <BottomNavigationAction label="目標登録" icon={<DrawIcon />} />
          <BottomNavigationAction label="成長記録" icon={<AccessibilityNewIcon />} />
        </BottomNavigation>
      </Box>
    </Paper>
   );
}

export default BottomNav;