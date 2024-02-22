import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from './routes/Login';
import Top from './routes/Top';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/top" element={<Top />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
