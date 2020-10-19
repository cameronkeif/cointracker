import React from 'react';
import { CoinItem } from '../react-app-env';

type CoinRowProps = {
  coin: CoinItem
};

/**
 * A row in the coin table, takes in a coin and outputs the necessary table row
 */
const CoinRow = ({ coin }: CoinRowProps) => (
  <tr className="coin-row">
    <td>
      <img className="coin-image" src={coin.iconUrl} alt={coin.name} />
      {coin.name}
    </td>
    <td>{coin.symbol}</td>
    <td>{parseFloat(coin.price).toFixed(2)}</td>
    <td className={coin.change >= 0 ? 'positive-change' : 'negative-change'}>
      {coin.change}
      %
    </td>
  </tr>
);

export default CoinRow;
