import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/App.css';
import bitcoinLogo from '../assets/bitcoin.svg';
import CoinRows from './CoinRows';

const App: React.FC = () => (
  <>
    <ToastContainer theme="colored" hideProgressBar />
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
  </>
);

export default App;
