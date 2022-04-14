// api
import axios from '.';

export interface CreateRoomBody {
  aboutObject: string;
  aboutObjectId: string;
  name: string;
  tribeId: string;
}

export const createRoom = (body: CreateRoomBody) =>
  axios
    .post('/api/v3/room', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
