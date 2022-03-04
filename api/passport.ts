import instance from '.';

export const reservePassport = (body: {
  passportId: number | string;
  partyId: number | string;
  created: string;
  amount: number;
  units: string;
  type: string;
  address: string;
  status: string;
}) =>
  instance
    .post('/api/v3/passportPurchase/reserve', body)
    .then(({ data }) => {
      return data;
    })
    .catch(({ response }) => {
      Promise.reject(response.data.message);
    });
