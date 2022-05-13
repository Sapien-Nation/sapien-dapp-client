// api
import axios from '.';

export const makeAllAsRead = async () =>
  axios
    .post('/core-api/notification/readAll')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
