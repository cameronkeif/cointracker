import React, { useEffect, useState } from 'react';
import CoinRow from './CoinRow';
import api from '../api';
import { CoinItem } from '../react-app-env';
import spinnerIcon from '../assets/spinner.png';

const CoinRows = () => {
  // const [symbols, setSymbols] = useState(['BTC', 'ETH']); // TODO allow this to be configured
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const symbols = ['BTC', 'ETH', 'USDT', 'XRP', 'BCH', 'BNB', 'LINK', 'ADA', 'LTC', 'BSV']; // TODO remove this in favor of the state which will be configurable
    api.getCoinData(symbols)
      .then((res) => {
        setCoins(res.body.data.coins);
        setIsLoading(false); // Clear initial loading state.
      });
    setInterval(() => {
      api.getCoinData(symbols)
        .then((res) => {
          setCoins(res.body.data.coins);
        });
    }, 15000);
  }, [/* symbols TODO implement */]);

  const coinRows = coins.map((coin: CoinItem) => (
    <CoinRow
      coin={coin}
      key={`coin-row-${coin.uuid}`}
    />
  ));

  if (isLoading) {
    return (
      <div>
        <img src={spinnerIcon} className="loading" alt="Loading" />
      </div>
    );
  }

  return (
    <table className="coin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price ($)</th>
          <th>Change (24hr)</th>
        </tr>
      </thead>
      <tbody>
        {coinRows}
      </tbody>
    </table>
  );
};

export default CoinRows;
