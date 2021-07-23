import { BaseEditor, Editor, Element as SlateElement, Transforms } from 'slate';

export const wrapOnlineVideo = (editor: BaseEditor, url: string) => {
  const results = url.match('v=([a-zA-Z0-9_-]+)&?');
  const videoId = results[1];

  if (isVideoActive(editor)) {
    unwrapVideo(editor);
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/1.jpg`;

  Transforms.insertNodes(editor, {
    children: [{ text: url }],
    // @ts-ignore
    type: 'video',
    url,
    image: {
      type: 'image',
      url: thumbnail,
      children: [{ text: '' }],
    },
  });

  Editor.insertBreak(editor);
};

const unwrapVideo = (editor: BaseEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === ('video' as any),
  });
};

const isVideoActive = (editor: BaseEditor) => {
  const [video] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === ('video' as any),
  });
  return !!video;
};
