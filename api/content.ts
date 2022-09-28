// api
import axios from '.';

export const uploadContentMedia = (data: FormData) =>
  axios
    .post('/core-api/content/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createContent = (content: {
  data: string;
  groupId: string;
  mimeType: string;
  title: string;
}) =>
  axios
    .post('/core-api/post', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createMediaContent = (content: {
  media: string;
  groupId: string;
  title: string;
  preview?: string;
  mimeType: string;
}) =>
  axios
    .post('/core-api/post/media', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createLinkContent = (content: {
  link: string;
  groupId: string;
  title: string;
  data?: string;
}) =>
  axios
    .post('/core-api/post/link', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

// TODO: rename data to description
// should this use a proposal type?
export const createProposalContent = (content: {
  groupId: string;
  title: string;
  data?: string;
  options: string[];
  start: string;
  end: string;
}) =>
  axios
    .post('/core-api/post/proposal', content)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteContent = (contentID: string) =>
  axios
    .delete(`/core-api/post/${contentID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
