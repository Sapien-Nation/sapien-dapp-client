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
    .post('/api/v3/tribe', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('/api/v3/tribe/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const joinTribe = (tribeID: string) =>
  axios
    .post(`/api/v3/tribe/${tribeID}/join`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
