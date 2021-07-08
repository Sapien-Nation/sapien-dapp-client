const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;
/*eslint-disable */
const youtubeRegex =
  /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\v=|\.be\/)([\-]*)(&(amp;)?‌​[\w\‌​=]*)?/;
/*eslint-enable */

export const isUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.origin !== null;
  } catch (e) {
    return false;
  }
  return true;
};

export const isOnlineVideo = (string: string) => {
  const match = string.match(youtubeRegex);
  if (!match) {
    return false;
  }
  return true;
};

export const checkUrl = (string: string) => {
  if (typeof string !== 'string') {
    return false;
  }

  const match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
};
