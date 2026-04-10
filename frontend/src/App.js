import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
   fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>React + Docker</h2>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;