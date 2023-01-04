import axios from 'axios';
import './App.css';

function App() {
  axios.post("http://localhost:8080/api/auth/login", {"username": "tom2", "password": "asdfasdf"})
  .then((res) => console.log(res));
  return (
    <div className="App">
      <header className="App-header">
        <h1>Assignment Submission Review App</h1>
      </header>
    </div>
  );
}

export default App;
