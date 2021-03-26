import React, { useEffect, useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from '@material-ui/core/colors';
import CoinRow from './CoinRow';
import api from '../api';
import { CoinItem } from '../react-app-env';
import spinnerIcon from '../assets/spinner.png';

const CoinRows = () => {
  const [symbols, setSymbols] = useState(['BTC', 'ETH']); // TODO allow this to be configured
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
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
  }, [symbols]);

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
    <>
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
      <div style={{ display: "inline-flex", alignItems: "center", width: "auto", marginTop: 20 }}>
        <Autocomplete
          id="combo-box-demo"
          options={[
            "Callisto Network (CLO)",
            "GreenCoin (GRE)"
          ]}
          style={{ width: 300, margin: "auto", display: "inline-block" }}
          renderInput={(params) => <TextField {...params} label="Combo box" size="small" variant="outlined" />}
        />
        <AddCircleIcon
          style={{ color: green[500], cursor: "pointer" }}
          fontSize="large"
          onClick={() => { setSymbols([...symbols, 'BSV']) }}
        />
      </div>
    </>
  );
};

export default CoinRows;
