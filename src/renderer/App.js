import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './App.css';

import { getSaltedBowls } from '../services/bowls';

const titleText = {
  0: 'Welcome !',
  1: 'It\'s up to you!'
}

function App() {
  const [title, setTitle] = useState(0);
  const [bowls, setBowls] = useState([]);

  const handleClick = () => {
    window.electron.send('get-new-title', title);
  }
  useEffect(() => {
    window.electron.recieve('display-new-title', (data) => {
      setTitle(data);
    })

    getSaltedBowls().then((res) => {
      setBowls(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [title, bowls])
  
  return (
    <div className="App">
      <header className="App-header">
        <img id="logo" src={logo} className="App-logo" alt="logo" />
        <div className="title">
          <h1>{titleText[title]}</h1>
          <img src="./potion.svg" className="App-potion" alt="potion" />
        </div>
        <p>Official Boilerplate for React Electron App</p>
        <a title="Site La Manu" className="App-link" href="https://lamanu.fr" target="_blank" rel="noopener noreferrer">Visit La Manu</a>
        <button onClick={handleClick} id="changeTitle">Change Title</button>
      </header>
    </div>
  );
}

export default App;
