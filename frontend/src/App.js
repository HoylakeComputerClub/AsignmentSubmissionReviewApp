import './App.css';
import { useEffect } from 'react';
import { useLocalState } from './utils/useLocalStorage';
function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if (!jwt) {
      
      const reqBody = {"username": "tom2", "password": "asdfasdf"};

      fetch("api/auth/login",{"headers": { "Content-Type": "application/json"}, 
      method: "post", body: JSON.stringify(reqBody)}).then((res) => Promise.all([res, res.headers]))
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
      });
    }
  }, [jwt, setJwt]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Assignment Submission Review App</h1>
        <h2>JWT</h2>
        <p>{jwt}</p>
      </header>
    </div>
  );
}

export default App;
