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
