import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from "react-router-dom";
import { MESSAGE } from './../components/Const';

import { removeSession } from './../components/CommonFunc';
import {
  isLoadingAtom
  , loggedInAtom
} from './../components/Atoms';

const Logout = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);

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
      {MESSAGE.LOGOUT}
    </Button>
  );
}

export default Logout;