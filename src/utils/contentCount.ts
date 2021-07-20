export const getContentCount = (content: string) => {
  const plainText = content?.replace(/<[^>]+>/g, '');

  return plainText.length;
};
