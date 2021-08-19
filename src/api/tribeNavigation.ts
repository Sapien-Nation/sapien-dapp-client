// api
import axios from '.';

// types
import type { CreateChannel } from 'tools/types/tribeNavigation';

// TODO add type
interface CreateSquare {
  name: string;
  tribeId: string;
}

export const createChannel = (body: CreateChannel) =>
  axios
    .post('api/v3/channel', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createSquare = (body: CreateSquare) =>
  axios
    .post('api/v3/square', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('api/v3/channel/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteImages = (keys: Array<string>) =>
  axios
    .post('api/v3/channel/image/upload/delete', keys)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
