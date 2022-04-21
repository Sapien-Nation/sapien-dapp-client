export const formatTokenID = (tokenId: string) => {
  let formatted = '';
  for (let i = 0; i < 8 - tokenId.length; i++) {
    formatted += '0';
  }

  formatted += tokenId;

  return formatted;
};
