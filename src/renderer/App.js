import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './App.css';
import KitchenCalendar from './kitchenCalendar/KitchenCalendar';

const titleText = {
  0: 'Welcome !',
  1: 'It\'s up to you!',
}

function App() {
  const [title, setTitle] = useState(0);
  const handleClick = () => {
    window.electron.send('get-new-title', title);
  }
  useEffect(() => {
    window.electron.recieve('display-new-title', (data) => {
      setTitle(data);
    })
  }, [title])
  
  return (
    <div className="App">
      <KitchenCalendar />
    </div>
  );
}

export default App;
