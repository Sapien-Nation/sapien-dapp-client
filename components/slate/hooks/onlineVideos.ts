import { Range, Transforms } from 'slate';

export const wrapOnlineVideo = (editor, url) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const results = url.match('v=([a-zA-Z0-9_-]+)&?');
  const videoId = results[1];

  const thumbnail = `https://img.youtube.com/vi/${videoId}/1.jpg`;

  const onlineVideo = {
    type: 'video',
    url,
    image: {
      type: 'image',
      url: thumbnail,
      children: [{ text: '' }],
    },
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, onlineVideo as any);
  } else {
    Transforms.wrapNodes(editor, onlineVideo as any, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};
