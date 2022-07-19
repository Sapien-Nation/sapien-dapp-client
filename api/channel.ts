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

export const createChannel = (
  body: CreateChannelBody
): Promise<ProfileTribeChannel> =>
  axios
    .post('/core-api/channel', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const uploadImage = (data: FormData) =>
  axios
    .post('/core-api/channel/image', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
