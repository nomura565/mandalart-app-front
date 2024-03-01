import Box from '@mui/material/Box';
import MandalartCell from './MandalartCell';

const MandalartCellRow = (props) => {
  return (
    <Box
      sx={{
        marginTop: '-1px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {Array(9).fill(0).map((cell, idx) => {
        const rowIndex = props.rowIndex;
        const culcIdx = idx + (rowIndex * 9);
        let isCenter = (idx % 3 === 1) ? true : false;
        if(rowIndex % 3 !== 1) isCenter = false;
        return (
          <MandalartCell key={culcIdx} idx={culcIdx} isCenter={isCenter} />
        );
      })}
    </Box>
   );
}

export default MandalartCellRow;