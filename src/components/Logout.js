import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom } from 'jotai';
import { useNavigate } from "react-router-dom";

import { removeSession } from './../components/CommonFunc';
import { 
  isLoadingAtom
  , loggedInAtom
   } from './../components/Atoms';

const Logout = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  /** ログアウト処理 */
  const logout = () => {
    setIsLoading(true);
    setLoggedIn(false);
    removeSession();
    navigate("/");
    setIsLoading(false);
  }

  return (
    <Button
      variant="contained"
      sx={{ mt: 1, mb: 1 }}
      disabled={isLoading}
      color="error"
      startIcon={<LogoutIcon />}
      onClick={logout}
    >
      Logout
    </Button>
   );
}

export default Logout;