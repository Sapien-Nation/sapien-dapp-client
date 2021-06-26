// api
import axios from '.';

export const createContent = (content: { data: string; squareId: string }) =>
  axios
    .post('/api/post/create', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
