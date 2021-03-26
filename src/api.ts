import request from 'superagent';

const getCoinData = async (symbols: Set<String>) => {
  const response = await request
    .get('https://api.coinranking.com/v1/public/coins')
    .query({
      symbols: Array.from(symbols).join(','),
    })
    .set('Accept', 'application/json');
  return response;
};

export default {
  getCoinData,
};
