import { ContentMimeType } from 'tools/constants/content';

export const getPlaceholderImageSrc = (mimeType) => {
  if (mimeType === ContentMimeType.Html) {
    return '/images/post-placeholders/proposal.png';
  } else if (mimeType === ContentMimeType.Link) {
    return '/images/post-placeholders/exit-top-right.png';
  } else if (mimeType.includes(ContentMimeType.Image)) {
    return '/images/post-placeholders/image.png';
  } else if (mimeType.includes(ContentMimeType.Video)) {
    return '/images/post-placeholders/video.png';
  } else if (mimeType.includes(ContentMimeType.Audio)) {
    return '/images/post-placeholders/sound-bars.png';
  } else {
    return '';
  }
};
