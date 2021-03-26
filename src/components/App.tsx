import React from 'react';
import '../styles/App.css';
import bitcoinLogo from '../assets/bitcoin.svg';
import CoinRows from './CoinRows';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>
        C
        <img src={bitcoinLogo} className="header-btc-logo" alt="bitcoin logo as an O" />
        intracker
      </h1>
    </header>
    <CoinRows />
    <footer>
      Data provided by Coinranking
    </footer>
  </div>
);

export default App;
