/// <reference types="react-scripts" />

// A single coin representation
interface CoinItem {
  symbol: string,
  name: string,
  price: string,
  change: number,
  uuid: string,
  iconUrl: string,
  history: Array<string>,
}

// Used for the Autocomplete option to be used for coin selection
interface CoinOption {
  name: string,
  symbol: string,
}

// The representation returned from the API
interface CoinData {
  data: {
    coins: Array<CoinItem>
  }
}

export {
  CoinItem,
  CoinData,
  CoinOption,
};
