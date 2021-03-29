import React, { useEffect, useState, Fragment } from 'react';

import request from 'superagent';

import AddCoinRow from './AddCoinRow';
import CoinRow from './CoinRow';
import api from '../api';
import { CoinItem, CoinOption } from '../react-app-env';
import spinnerIcon from '../assets/spinner.png';

const CoinRows = () => {
  const [symbols, setSymbols] = useState<Set<string>>(new Set());
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimerId, setActiveTimerId] = useState<null | NodeJS.Timeout>(null);

  const addCoin = (selectedCoin: CoinOption) => {
    const updatedSymbols = new Set(symbols);
    updatedSymbols.add(selectedCoin.symbol);

    setSymbols(updatedSymbols);

    if (activeTimerId) {
      clearInterval(activeTimerId);
    }
  };

  const removeCoin = (symbol: string) => {
    const updatedSymbols = new Set(symbols);
    updatedSymbols.delete(symbol);
    setSymbols(updatedSymbols);

    if (activeTimerId) {
      clearInterval(activeTimerId);
    }

    if (updatedSymbols.size === 0) {
      setCoins([]);
    }
  };

  useEffect(() => {
    if (symbols.size === 0) {
      return;
    }

    api.getCoinData(symbols)
      .then((res: request.Response) => {
        setCoins(res.body.data.coins);
        setIsLoading(false); // Clear initial loading state.
      });
    setActiveTimerId(setInterval(() => {
      setIsLoading(true);
      api.getCoinData(symbols)
        .then((res: request.Response) => {
          setCoins(res.body.data.coins);
          setIsLoading(false);
        });
    }, 15000));
  }, [symbols]);
  const coinRows = coins.map((coin: CoinItem) => (
    <CoinRow
      coin={coin}
      onRemove={removeCoin}
      key={`coin-row-${coin.uuid}`}
    />
  ));

  return (
    <Fragment>
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
      <AddCoinRow onAdd={addCoin} selectedSymbols={symbols} />
      {isLoading && symbols.size > 0 && <div><img src={spinnerIcon} className="loading" alt="Loading" /></div>}
    </Fragment>
  );
};

export default CoinRows;
