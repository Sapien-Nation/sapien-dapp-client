export const isSameOriginURL = (url): URL | null => {
  if (typeof window === 'undefined') return null;

  const linkURL = new URL(url);

  if (window.location.origin === linkURL.origin) return linkURL;

  return null;
};
