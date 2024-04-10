import * as React from 'react';
import Box from '@mui/material/Box';
import GaugeChart from 'react-gauge-chart';
import { useAtomValue } from 'jotai';

import {
  achievementGaugeValueAtom
} from './../components/Atoms';

const AchievementGauge = (props) => {
  const achievementGaugeValue = useAtomValue(achievementGaugeValueAtom);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'fixed'
        , top: 120
        , right: -30
        , '& > :not(style)': {
          m: 1,
          width: 200,
          height: 200,
        },
      }}
    >
      <GaugeChart id="achievemen-gauge"
        nrOfLevels={20}
        percent={props.getTotalAchievementLevel()}
        colors={["#C6E0B4", "#FFC371"]}
        style={
          {
            width: 250
            , height: 200
          }
        }
        textColor="#000000"
      />
    </Box>
  );
}

export default AchievementGauge;