// api
import axios from '.';

export const uploadContentMedia = (data: FormData) =>
  axios
    .post('api/v3/content/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
