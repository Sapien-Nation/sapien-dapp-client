// api
import axios from '.';

export const uploadImage = (data: FormData) =>
  axios
    .post('api/v3/tribe/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
