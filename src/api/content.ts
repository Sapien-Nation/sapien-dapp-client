// api
import axios from '.';

export const createContent = (content: FormData) =>
  axios
    .post('/api/post/create', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
