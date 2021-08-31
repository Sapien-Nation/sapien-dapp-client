// api
import { notificationInstance } from '.';

export const markAsRead = (notificationId: string) =>
  notificationInstance
    .put(`api/v3/notification/${notificationId}/read`)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
