// api
import axios from '.';

export const updateProfile = (data: { bio: string }) =>
  axios
    .patch('/core-api/user/profile', data)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const updateFlairBadge = (badgeIds: Array<string>) =>
  axios
    .post('/core-api/user//flair', { badgeIds })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
