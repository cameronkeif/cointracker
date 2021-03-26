import React from 'react';
import { red } from '@material-ui/core/colors';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

import { CoinItem } from '../react-app-env';

type CoinRowProps = {
  coin: CoinItem,
  onRemove: Function,
};

/**
 * A row in the coin table, takes in a coin and outputs the necessary table row
 */
const CoinRow = ({ coin, onRemove }: CoinRowProps) => (
  <tr className="coin-row">
    <td>
      <img className="coin-image" src={coin.iconUrl} alt={coin.name} />
      {coin.name}
    </td>
    <td>{coin.symbol}</td>
    <td>
      {
      parseFloat(coin.price).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        },
      )
}

    </td>
    <td className={coin.change >= 0 ? 'positive-change' : 'negative-change'}>
      {coin.change}
      %
    </td>
    <td>
      <RemoveIcon
        style={{ color: red[500], cursor: 'pointer' }}
        fontSize="small"
        onClick={() => onRemove(coin.symbol)}
      />
    </td>
  </tr>
);

export default CoinRow;
