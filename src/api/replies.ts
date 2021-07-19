// api
import axios from '.';

export const createReply = (postID: string, data: { data: string }) =>
  axios
    .post(`/api/v3/post/${postID}/reply`, data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteReply = (replyID: string) =>
  axios
    .delete(`/api/v3/post/${replyID}/reply`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
