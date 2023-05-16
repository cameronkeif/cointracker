import { Handler } from '@netlify/functions';
import request from 'superagent';

export const handler: Handler = async (event) => {
  const uuids: string = event.queryStringParameters?.uuids || '';
  const apiKey = process.env.COINRANKING_API_KEY || '';
  const response = await request
    .get('https://api.coinranking.com/v2/coins')
    .set('x-access-token', apiKey)
    .query({
      uuids: Array.from(uuids).join(','),
    })
    .set('Accept', 'application/json');

  return {
    statusCode: 200,
    body: response.body,
  };
};

export default handler;
