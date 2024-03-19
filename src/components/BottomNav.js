import DrawIcon from '@mui/icons-material/Draw';
import PaletteIcon from '@mui/icons-material/Palette';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAtom } from 'jotai';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { MESSAGE } from './../components/Const';

import { 
  bottomNavValueAtom
  , whenAchievementAtom
  , targetMessageAtom
  , growthMessageAtom
   } from './../components/Atoms';

const BottomNav = (props) => {
  const [bottomNavValue, setBottomNavValue] = useAtom(bottomNavValueAtom);
  const [whenAchievement, setWhenAchievement] = useAtom(whenAchievementAtom);
  const [targetMessage, setTargetMessage] = useAtom(targetMessageAtom);
  const [growthMessageOpen, setgrowthMessageOpen] = useState(false);

  /** マンダラート機能変更 */
  const bottomNavChange = (e, newValue) => {
    props.bottomNavChange(newValue);
  }

  const growthRecordMouseEnter = () => {
    setgrowthMessageOpen(true);
  }

  const growthRecordMouseLeave = () => {
    setgrowthMessageOpen(false);
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
            placement="top"
          >
            <BottomNavigationAction label={MESSAGE.ACHIEVEMENT_INPUT} icon={<PaletteIcon />} />
          </Tooltip>
          <Tooltip title={targetMessage} 
            arrow 
            open={true}
            placement="top"
          >
            <BottomNavigationAction label={MESSAGE.TARGET_INPUT}  icon={<DrawIcon />} />
          </Tooltip>
          <Tooltip title={MESSAGE.GROWTH_MESSAGE} 
            arrow 
            placement="bottom"
            open={growthMessageOpen && bottomNavValue == 2}
          >
            <BottomNavigationAction 
              onMouseEnter={growthRecordMouseEnter}
              onMouseLeave={growthRecordMouseLeave}
              label={MESSAGE.GROWTH_RECORD}  
              icon={<AccessibilityNewIcon />} 
            />
          </Tooltip>
        </BottomNavigation>
      </Box>
    </Paper>
   );
}

export default BottomNav;