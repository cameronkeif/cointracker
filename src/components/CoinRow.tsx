import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { red } from '@material-ui/core/colors';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

import { CoinItem } from '../react-app-env';

export type CoinRowProps = {
  coin: CoinItem,
  onRemove: Function,
};

/**
 * A row in the coin table, takes in a coin and outputs the necessary table row
 */
const CoinRow: React.FC<CoinRowProps> = ({ coin, onRemove }: CoinRowProps) => (
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
      {coin.change.toFixed(2)}
      %
      <span className="sparkline-container">
        <Sparklines data={coin.history.map((price) => parseFloat(price))} svgWidth={50} svgHeight={15} margin={5}>
          <SparklinesLine color={coin.change >= 0 ? 'green' : 'red'} />
        </Sparklines>
      </span>
    </td>
    <td>
      <RemoveIcon
        style={{ color: red[500], cursor: 'pointer' }}
        fontSize="small"
        onClick={() => onRemove(coin.symbol)}
        titleAccess="Remove"
      />
    </td>
  </tr>
);

export default CoinRow;
