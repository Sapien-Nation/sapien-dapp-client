// api
import axios from '.';

// types
import type { ProfileTribe } from 'tools/types/tribe';

export interface CreateTribeBody {
  avatar?: string;
  cover?: string;
  description: string;
  identifier: string;
  name: string;
}

export const createTribe = (body: CreateTribeBody): Promise<ProfileTribe> =>
  axios
    .post('/core-api', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('/core-api/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const joinTribe = (tribeID: string) =>
  axios
    .post(`/core-api/${tribeID}/join`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
