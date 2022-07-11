// api
import axios from '.';

// types
import type { ProfileTribe } from 'tools/types/tribe';

export interface CreateTribeBody {
  avatar?: string;
  cover?: string;
  description: string;
  name: string;
}

export interface UpgradeTribeBody {
  threshold: number;
  owners: Array<{ id: string; walletAddress: string }>;
  passportTokenId: number;
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
    .put(`/core-api/notification/tribe/${tribeID}/read`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const upgradeTribe = (tribeID: string, body: UpgradeTribeBody) =>
  axios
    .post(`/core-api/tribe/${tribeID}/upgrade`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const upgradeTribeOwners = (tribeID: string) =>
  axios
    .post(`/core-api/tribe/${tribeID}/upgrade-owners`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const createTribeBadge = (body: {
  tribeId: string;
  name: string;
  description: string;
  color: string;
  rooms: Array<string>;
  members: Array<{ id: string; walletAddress: string }>;
}) =>
  axios
    .post(`/core-api/badge`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const proposeBadgeGrant = (
  badgeID: string,
  body: {
    tribeId: string;
    members: Array<{ id: string; walletAddress: string }>;
  }
) =>
  axios
    .post(`/core-api/badge/${badgeID}/propose-grant`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const rejectTransaction = (
  badgeID: string,
  body: {
    tribeId: string;
    safeTxHash: string;
  }
) =>
  axios
    .post(`/core-api/badge/${badgeID}/reject`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const signTransaction = (
  badgeID: string,
  body: {
    tribeId: string;
    safeTxHash: string;
  }
) =>
  axios
    .post(`/core-api/badge/${badgeID}/sign`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const executeTransaction = (
  badgeID: string,
  body: {
    safeTxHash: string;
    tribeId: string;
  }
) =>
  axios
    .post(`/core-api/badge/${badgeID}/grant`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const addTribeFromDiscovery = (tribeID: string, badgeID: string) =>
  axios
    .post(`/core-api/tribe/${tribeID}/badge/${badgeID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
