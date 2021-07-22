import {
  BaseEditor,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from 'slate';

export const wrapOnlineVideo = (editor: BaseEditor, url: string) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const results = url.match('v=([a-zA-Z0-9_-]+)&?');
  const videoId = results[1];

  if (isVideoActive(editor)) {
    unwrapVideo(editor);
  }

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
    //TODO FOCUS AFTER INSERT
  } else {
    Transforms.wrapNodes(editor, onlineVideo as any, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
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
