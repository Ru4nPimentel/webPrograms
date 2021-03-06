import React from 'react';
import Header from './components/Header/index.jsx';
import Routes from './routes'
import './style.css';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes />
    </div>
  );
}

export default App;
