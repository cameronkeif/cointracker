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
    <td>{coin.name}</td>
    <td>{coin.symbol}</td>
    <td>{parseFloat(coin.price).toFixed(2)}</td>
    <td>{coin.change}</td>
  </tr>
);

export default CoinRow;
