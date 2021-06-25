import ethPrice from 'eth-price';

export const formatSpn = (spn: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(spn)
    .replace('$', '');

export const formatSpnToUsd = (spn: number, conversion = 0.1) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    spn * conversion
  );

export const formatEthToSpn = (eth: number, conversion = 552578.6302813531) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(eth * conversion)
    .replace('$', '');

export const formatEthToUsd = async (eth: number) => {
  const price = await ethPrice();
  return `$${eth * Number(price[0].replace('USD:', ''))}`;
};
