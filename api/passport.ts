// api
import axios from '.';

export const mintPassport = () =>
  axios
    .post('/api/v3/passport/mint')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
