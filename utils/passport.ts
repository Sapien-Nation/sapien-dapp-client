import _range from 'lodash/range';

export const formatAvatarName = (name: string) => {
  const maxLength = 14;
  return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
};

export const formatTokenID = (tokenId: number) =>
  _range(0, 13 - String(tokenId).length).reduce(
    (prev) => `0${prev}`,
    String(tokenId)
  );
