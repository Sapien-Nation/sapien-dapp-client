export const getFormattedDate = (isoString: string) => {
  const options = { month: 'short', day: 'numeric', year: '2-digit' };
  const date = new Date(isoString);
  // @ts-ignore
  const americanDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return americanDate;
};
