import request from 'superagent';

const getCoinData = async (uuids: Set<String>) => {
  const response = await request
    .get('https://api.coinranking.com/v2/coins')
    .query({
      uuids: Array.from(uuids).join(','),
    })
    .set('Accept', 'application/json');
  return response;
};

export default {
  getCoinData,
};
