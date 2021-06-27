// api
import axios from '.';

// types
import type { CreateTribe } from 'tools/types/tribeBar';

export const createTribe = (body: CreateTribe) =>
  axios
    .post('api/v3/tribe/create', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('api/v3/tribe/upload/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteImage = (keys: Array<string>) =>
  axios
    .post('api/v3/tribe/image/upload/delete', keys)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
