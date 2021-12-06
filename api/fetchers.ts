// api
import { authInstance } from '.';

export const authFetcher = () =>
  authInstance
    .get('/api/v3/user/me')
    .then(({ data }) => data)
    .catch((response) => Promise.reject(response.data.message));
