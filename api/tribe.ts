// api
import axios from '.';

export interface CreateTribeBody {
  avatar?: string;
  cover?: string;
  description: string;
  identifier: string;
  name: string;
}

export const createTribe = (body: CreateTribeBody) =>
  axios
    .post('api/v3/tribe', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('api/v3/tribe/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
