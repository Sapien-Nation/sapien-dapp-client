// api
import axios from '.';

export const sendRawTransaction = (body: { rawTx: string }) =>
  axios
    .post('/api/v3/wallet/send', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
