import React, { ChangeEvent, KeyboardEvent } from 'react';
import { green, grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';

import { CoinOption } from '../react-app-env';
import coinOptions from '../data/coin-options.json';

export type AddCoinRowProps = {
  onAdd: Function,
  selectedSymbols: Set<string>
};

const AddCoinRow = ({ onAdd, selectedSymbols }: AddCoinRowProps) => {
  const [selectedCoin, setSelectedCoin] = React.useState<null | CoinOption>(null);

  const addCoin = () => {
    if (selectedCoin === null) {
      return;
    }

    onAdd(selectedCoin);

    setSelectedCoin(null);
  };

  const addButtonColor = selectedCoin ? green[500] : grey[500];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', width: 'auto', marginTop: 20,
    }}
    >
      <Autocomplete
        id="combo-box-demo"
        options={coinOptions.filter((coinOption: CoinOption) => !selectedSymbols.has(coinOption.symbol))}
        style={{ width: 300, margin: 'auto', display: 'inline-block' }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            label="Add coin"
            size="small"
            variant="outlined"
            data-id="coin-input"
          />
        )}
        getOptionLabel={(coinOption: CoinOption) => `${coinOption.name} (${coinOption.symbol})`}
        onChange={(
          event: ChangeEvent<{}>,
          newSelectedCoin: { name: string; symbol: string; } | null,
        ) => { setSelectedCoin(newSelectedCoin); }}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter') {
            addCoin();
          }
        }}
        value={selectedCoin}
      />
      <IconButton
        disabled={!selectedCoin}
        onClick={addCoin}
        data-id="add-btn"
      >
        <AddCircleIcon
          style={{ color: addButtonColor, cursor: 'pointer' }}
          fontSize="large"
        />
      </IconButton>
    </div>
  );
};

export default AddCoinRow;
