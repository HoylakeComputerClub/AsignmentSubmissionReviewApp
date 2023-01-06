import './App.css';
import { useEffect } from 'react';
import { useLocalState } from './utils/useLocalStorage';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard jwt={jwt} setJwt={setJwt}/></PrivateRoute>} />
        <Route path="/login" element={<Login jwt={jwt} setJwt={setJwt} />} />
        <Route path="/" element={<HomePage jwt={jwt} setJwt={setJwt} />} />

      </Routes>
          {/* <header className="App-header">
        <h1>Assignment Submission Review App</h1>
        <h2>JWT</h2>
        <p>{jwt}</p>
      </header>
    </div> */}
      </div>


  );
}

export default App;
