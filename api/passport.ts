// api
import axios from '.';

export const mintPassport = (walletAddress: string) =>
  axios
    .post('/core-api/passport/mint', { walletAddress })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
