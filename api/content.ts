// api
import axios from '.';

export const uploadContentMedia = (data: FormData) =>
  axios
    .post('/api/v3/content/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createContent = (content: { data: string; groupId: string }) =>
  axios
    .post('/api/v3/post', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteContent = (contentID: string) =>
  axios
    .delete(`/api/v3/post/${contentID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
