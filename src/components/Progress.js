import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useAtom } from 'jotai';
import { 
  isLoadingAtom
   } from './../components/Atoms';

const Progress = (props) => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  return (
    <div>
    {isLoading && (
    <CircularProgress
      size={24}
      sx={{
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-65px',
        marginLeft: '-12px',
      }}
    />
    )}
    </div>
   );
}

export default Progress;