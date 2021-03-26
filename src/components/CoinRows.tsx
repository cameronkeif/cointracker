import React, {
  useEffect, useState, Fragment, ChangeEvent,
} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { green, grey } from '@material-ui/core/colors';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import request from 'superagent';
import CoinRow from './CoinRow';
import api from '../api';
import { CoinItem, CoinOption } from '../react-app-env';
import spinnerIcon from '../assets/spinner.png';

import coinOptions from '../data/coin-options.json';

const CoinRows = () => {
  const [symbols, setSymbols] = useState<Array<string>>([]);
  const [selectedCoin, setSelectedCoin] = useState<null | CoinOption>(null);
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimerId, setActiveTimerId] = useState<null | NodeJS.Timeout>(null);

  const addSymbol = () => {
    if (selectedCoin === null) {
      return;
    }

    setSymbols([...symbols, selectedCoin.symbol]);
    setSelectedCoin(null);

    if (activeTimerId) {
      clearInterval(activeTimerId);
    }
  };

  useEffect(() => {
    if (symbols.length === 0) {
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
      key={`coin-row-${coin.uuid}`}
    />
  ));

  const addButtonColor = selectedCoin ? green[500] : grey[500];
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
      <div style={{
        display: 'inline-flex', alignItems: 'center', width: 'auto', marginTop: 20,
      }}
      >
        <Autocomplete
          id="combo-box-demo"
          options={coinOptions.filter((coinOption: CoinOption) => !symbols.includes(coinOption.symbol))}
          style={{ width: 300, margin: 'auto', display: 'inline-block' }}
          renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="Add coin" size="small" variant="outlined" />}
          getOptionLabel={(coinOption: CoinOption) => `${coinOption.name} (${coinOption.symbol})`}
          onChange={(
            event: ChangeEvent<{}>,
            newSelectedCoin: { name: string; symbol: string; } | null,
          ) => { setSelectedCoin(newSelectedCoin); }}
          value={selectedCoin}
        />
        <IconButton
          disabled={!selectedCoin}
          onClick={addSymbol}
        >
          <AddCircleIcon
            style={{ color: addButtonColor, cursor: 'pointer' }}
            fontSize="large"
          />
        </IconButton>
      </div>
      {isLoading && symbols.length > 0 && <div><img src={spinnerIcon} className="loading" alt="Loading" /></div>}
    </>
  );
};

export default CoinRows;
