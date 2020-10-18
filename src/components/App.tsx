import React from 'react';
import '../styles/App.css';
import CoinRows from './CoinRows';

const App = () => (
  <div className="App">
    <header className="App-header">
      <CoinRows />
    </header>
    <footer>
      Data provided byCoinranking
    </footer>
  </div>
);

export default App;
