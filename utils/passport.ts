export const formatTokenID = (tokenId: string) => {
  let formatted = '';
  for (let i = 0; i < 8 - tokenId.length; i++) {
    formatted += '0';
  }

  formatted += tokenId;

  return formatted;
};

export const formatAvatarName = (name: string) => {
  const maxLength = 14;
  return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
};
