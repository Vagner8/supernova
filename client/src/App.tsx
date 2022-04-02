import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  async function fetchData() {
    const res = await fetch('/users')
    console.log(await res.json())
  }

  useEffect(() => {
    fetchData() 
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
