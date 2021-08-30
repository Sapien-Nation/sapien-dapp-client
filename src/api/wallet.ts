import { tokensInstance } from '.';

export const sendRawTransaction = (body: { rawTx: string }) =>
  tokensInstance
    .post('/api/v3/wallet/send', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const sendSPN = (body: {
  fromUserId: string;
  toUserId: string;
  spnAmount: number;
  rawTx: string;
}) =>
  tokensInstance
    .post('/api/v3/wallet/sendSPN', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const purchaseBadge = (body: {
  rawTx: string;
  parentBadgeId: string;
  ownerId: string;
  totalPrice: number;
}) =>
  tokensInstance
    .post('/api/v3/badge/purchaseBadge', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const grantSapienBadge = (userId: string) =>
  tokensInstance
    .post('/api/v3/badge/grantSapienBadge', { userId: userId })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
