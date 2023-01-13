import './App.css';
import { useLocalState } from './utils/useLocalStorage';
import { Route, Routes } from 'react-router-dom';
import Dashboards from './Dashboards';
import HomePage from './HomePage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div className="App">
      <Routes>
    
        <Route path="/dashboard" element={<PrivateRoute><Dashboards jwt={jwt} setJwt={setJwt} /></PrivateRoute>}/>
        <Route path='/assignments/:id' element={<PrivateRoute><AssignmentView jwt={jwt} setJwt={setJwt} /></PrivateRoute>} />
        <Route path="/login" element={<Login jwt={jwt} setJwt={setJwt} />} />
        <Route path="/" element={<HomePage jwt={jwt} setJwt={setJwt} />} />

      </Routes>
      </div>


  );
}

export default App;
