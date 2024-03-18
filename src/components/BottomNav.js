import DrawIcon from '@mui/icons-material/Draw';
import PaletteIcon from '@mui/icons-material/Palette';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';

import { 
  bottomNavValueAtom
  , textFieldDisabledAtom
  , whenAchievementAtom
  , targetMessageAtom
   } from './../components/Atoms';

const BottomNav = (props) => {
  const [bottomNavValue, setBottomNavValue] = useAtom(bottomNavValueAtom);
  const [textFieldDisabled, setTextFieldDisabled] = useAtom(textFieldDisabledAtom);
  const [whenAchievement, setWhenAchievement] = useAtom(whenAchievementAtom);
  const [targetMessage, setTargetMessage] = useAtom(targetMessageAtom);

  /** マンダラート機能変更 */
  const bottomNavChange = (e, newValue) => {
    props.bottomNavChange(newValue);
  }

  return (
    <Paper elevation={3}>
      <Box >
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={bottomNavChange}
        >
          <Tooltip title={whenAchievement} 
            arrow 
            open={true}
            placement="left"
          >
            <BottomNavigationAction label="実績入力" icon={<PaletteIcon />} />
          </Tooltip>
          <Tooltip title={targetMessage} 
            arrow 
            open={true}
            placement="top"
          >
            <BottomNavigationAction label="目標登録" icon={<DrawIcon />} />
          </Tooltip>
          <BottomNavigationAction label="成長記録" icon={<AccessibilityNewIcon />} />
        </BottomNavigation>
      </Box>
    </Paper>
   );
}

export default BottomNav;