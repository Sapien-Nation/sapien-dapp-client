import instance from 'api';

export const sendSPN = (body: {
  fromUserId: string;
  toUserId: string;
  spnAmount: number;
  contentId: string;
  rawTx: string;
}) =>
  instance
    .post('/api/v3/wallet/sendSPN', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
