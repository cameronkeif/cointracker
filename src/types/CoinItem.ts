// A single coin representation
export interface CoinItem {
  symbol: string,
  name: string,
  price: string,
  change: number,
  uuid: string,
  iconUrl: string,
  sparkline: Array<string>,
}

export default CoinItem;
