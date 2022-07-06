// api
import axios from '.';

export const makeAllAsRead = async () =>
  axios
    .put('/core-api/notification/read')
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const markAsRead = async (notificationID: string) =>
  axios
    .put(`/core-api/notification/${notificationID}`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
