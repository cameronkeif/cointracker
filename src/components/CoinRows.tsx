import React, { useEffect, useState } from 'react';
import CoinRow from './CoinRow';
import api from '../api';
import { CoinItem } from '../react-app-env';

const CoinRows = () => {
  // const [symbols, setSymbols] = useState(['BTC', 'ETH']); // TODO allow this to be configured
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const symbols = ['BTC', 'ETH']; // TODO remove this in favor of the state which will be configurable
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
    return <div>Loading...</div>; // TODO this could probably be nicer,
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {coinRows}
      </tbody>
    </table>
  );
};

export default CoinRows;
