// api
import axios from '.';

// types
import { ProfileTribeChannel } from 'tools/types/tribe';

export interface CreateChannelBody {
  avatar?: string;
  badges: Array<string>;
  cover?: string;
  name: string;
  tribeId: string;
}

export interface EditChannelBody {
  avatar?: string;
  cover?: string;
  name: string;
  tribeId: string;
}

export const createChannel = (
  body: CreateChannelBody
): Promise<ProfileTribeChannel> =>
  axios
    .post('/core-api/channel', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteChannel = (channelID: string) =>
  axios
    .delete(`/core-api/channel/${channelID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const updateChannel = (
  channelID: string,
  body: EditChannelBody
): Promise<ProfileTribeChannel> =>
  axios
    .patch(`/core-api/channel/${channelID}`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('/core-api/channel/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
