import React from 'react';
import '../styles/App.css';
import bitcoinLogo from '../assets/bitcoin.svg';
import CoinRows from './CoinRows';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <h1>
        C
        <img src={bitcoinLogo} className="header-btc-logo" alt="bitcoin logo as an O" />
        intracker
      </h1>
    </header>
    <section className="farewall-message">
      <div>
        Regretfully, this application no longer works as the backing API requires a paid plan now.
      </div>
      <div>
        This was a fun learning exercise regardless! Check out
        {' '}
        <a href="https://github.com/cameronkeif/cointracker">code</a>
        {' '}
        if you want to learn more about what I worked on here!
      </div>
    </section>
    <CoinRows />
    <footer>
      Data provided by Coinranking
    </footer>
  </div>
);

export default App;
