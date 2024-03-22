import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';


import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Top from './routes/Top';
import { 
  getSession
   } from './components/CommonFunc';
import { 
  loggedInAtom
   } from './components/Atoms';

function App() {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  const PrivateRoute = ({ children }) => {
    if (!loggedIn && !getSession().user_id) {
      return <Navigate to={"/"} />
    } else {
      return children
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/top" element={<PrivateRoute><Top /></PrivateRoute>} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
