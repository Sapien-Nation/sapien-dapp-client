export const isUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.origin !== null;
  } catch (e) {
    return false;
  }
  return true;
};
