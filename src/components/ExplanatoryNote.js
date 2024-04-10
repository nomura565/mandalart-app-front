import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SquareIcon from '@mui/icons-material/Square';
import { MESSAGE } from './../components/Const';

const ExplanatoryNote = (props) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'fixed'
        , top: 1
        , right: 5
        , '& > :not(style)': {
          m: 1,
          width: 170,
          height: 110,
        },
      }}
    >
      <Paper elevation={3}>
        <Grid container spacing={1} className='explanatory-note-grid'>
          <Grid item xs={6} md={2}>
            <SquareIcon className='achievement-cell-level-1' />
          </Grid>
          <Grid item xs={6} md={10}>
            {MESSAGE.ACHIEVEMENT_LEVEL_1}
          </Grid>
          <Grid item xs={6} md={2}>
            <SquareIcon className='achievement-cell-level-2' />
          </Grid>
          <Grid item xs={6} md={10}>
            {MESSAGE.ACHIEVEMENT_LEVEL_2}
          </Grid>
          <Grid item xs={6} md={2}>
            <SquareIcon className='achievement-cell-level-3' />
          </Grid>
          <Grid item xs={6} md={10}>
            {MESSAGE.ACHIEVEMENT_LEVEL_3}
          </Grid>
        </Grid>

      </Paper>
    </Box>
  );
}

export default ExplanatoryNote;