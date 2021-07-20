export const getContentCount = (content: string) =>
  content?.replace(/<[^>]+>/g, '').length;
