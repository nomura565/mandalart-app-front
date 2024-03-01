import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useAtom } from 'jotai';
import { 
  errorMessageAtom
   } from './../components/Atoms';

const ErrorMessage = (props) => {
  const [errorMessage, setErrorMessage] = useAtom(errorMessageAtom);
  return (
    <div>
    {errorMessage
      ?
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <Alert className='alert' severity="error">{errorMessage}</Alert>
      </Box>
      : ""
    }
    </div>
   );
}

export default ErrorMessage;