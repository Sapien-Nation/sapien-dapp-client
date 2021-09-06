// api
import axios from '.';

export const joinTribe = (tribeID: string) =>
  axios
    .post(`/api/v3/tribe/${tribeID}/join`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
