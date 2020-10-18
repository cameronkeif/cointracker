/// <reference types="react-scripts" />

interface CoinItem {
  symbol: string,
  name: string,
  price: string,
  change: number,
  uuid: string
}

interface CoinData {
  data: {
    coins: Array<CoinItem>
  }
}

export {
  CoinItem,
  CoinData,
};
