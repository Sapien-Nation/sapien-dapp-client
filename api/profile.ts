// api
import axios from '.';

export const updateProfile = (data: { bio: string }) =>
  axios
    .patch('/core-api/user/profile', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
