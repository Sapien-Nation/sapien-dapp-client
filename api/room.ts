// api
import axios from '.';

// constants
import { RoomType } from 'tools/constants/rooms';

export interface CreateRoomBody {
  aboutObject: string;
  aboutObjectId: string;
  badges?: Array<string>;
  name: string;
  tribeId: string;
  type?: RoomType;
}

export const createRoom = (body: CreateRoomBody) =>
  axios
    .post('/core-api/room', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const joinRoom = (roomID: string) =>
  axios
    .post(`/core-api/room/${roomID}/join`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const sendMessage = (roomID: string, body: any) =>
  axios
    .post(`/core-api/room/${roomID}/message`, body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteMessage = (roomID: string, messageID: string) =>
  axios
    .delete(`/core-api/room/${roomID}/message/${messageID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const readRoom = (roomID: string) =>
  axios
    .put(`/core-api/notification/room/${roomID}/read/`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const deleteRoom = (roomID: string) =>
  axios
    .delete(`/core-api/room/${roomID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const reactToMessage = (
  roomID: string,
  messageID: string,
  emojiID: string
) =>
  axios
    .post(`/core-api/room/${roomID}/reaction`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
