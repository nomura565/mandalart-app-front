import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useAtom } from 'jotai';
import { 
  successMessageAtom
   } from './../components/Atoms';

const SuccessMessage = (props) => {
  const [successMessage, setSuccessMessage] = useAtom(successMessageAtom);
  return (
    <div>
    {successMessage
      ?
      <Box
        sx={{
          marginTop: 2,
          position: 'fixed',
          top:0,
          width: "calc(68%)",
          zIndex:1000,
          opacity:0.8
        }}
      >
        <Alert className='alert-success' severity="success">{successMessage}</Alert>
      </Box>
      : ""
    }
    </div>
   );
}

export default SuccessMessage;