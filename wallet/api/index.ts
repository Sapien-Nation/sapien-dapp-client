import instance from 'api';

export const sendRawTransaction = (body: { rawTx: string }) =>
  instance
    .post('/api/v3/wallet/send', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

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

export const sendBadge = (body: {
  fromUserId: string;
  toUserId: string;
  badgeBlockchainId: number;
  amount: number;
  userIsAdmin: boolean;
  contentId?: string;
  rawTx: string;
}) =>
  instance
    .post('/api/v3/wallet/sendBadge', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const purchaseBadge = (body: {
  rawTx: string;
  parentBadgeId: string;
  ownerId: string;
  totalPrice: number;
  isJoiningTribe: boolean;
}) =>
  instance
    .post('/api/v3/badge/purchaseBadge', body)
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));

export const grantSapienBadge = (userId: string) =>
  instance
    .post('/api/v3/badge/grantSapienBadge', { userId: userId })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response.data.message));
