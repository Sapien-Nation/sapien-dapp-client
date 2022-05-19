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

export interface UpgradeTribeBody {
  safeAddress: string;
  threshold: number;
  owners: Array<{ id: string; walletAddress: string }>;
}

export const createTribe = (body: CreateTribeBody): Promise<ProfileTribe> =>
  axios
    .post('/core-api/tribe', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const editTribe = (
  tribeID: string,
  body: CreateTribeBody
): Promise<ProfileTribe> =>
  axios
    .put(`/core-api/tribe/${tribeID}`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('/core-api/tribe/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const joinTribe = (tribeID: string) =>
  axios
    .post(`/core-api/tribe/${tribeID}/join`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const leaveTribe = (tribeID: string) =>
  axios
    .post(`/core-api/tribe/${tribeID}/leave`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const readAllTribeNotifications = (tribeID: string) =>
  axios
    .post(`/core-api/tribe/${tribeID}/readAll`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const upgradeTribe = (tribeID: string, body: UpgradeTribeBody) =>
  axios
    .post(`/core-api/tribe/${tribeID}/upgrade`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
