// api
import axios from '.';

export const createTribe = (body: FormData) =>
  axios
    .post('api/tribe/create', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
