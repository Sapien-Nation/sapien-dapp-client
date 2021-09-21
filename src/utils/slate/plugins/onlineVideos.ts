import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { isElementActive, unwrapElement } from './helpers';

export const wrapOnlineVideo = (editor: any, url: string) => {
  const results = url.match('v=([a-zA-Z0-9_-]+)&?');
  const videoId = results[1];

  if (isElementActive(editor, 'video')) {
    unwrapElement(editor, 'video');
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/1.jpg`;
  const embed = `https://www.youtube.com/embed/${videoId}`;

  Transforms.insertNodes(editor, [
    {
      children: [{ text: url }],
      // @ts-ignore
      type: 'video',
      url,
      embed,
      removeMethod: () => {
        editor.selection &&
          Transforms.delete(editor, {
            at: editor.selection,
            unit: 'block',
          });

        ReactEditor.focus(editor);
      },
      image: {
        type: 'image',
        url: thumbnail,
        children: [{ text: '' }],
      },
    },
    {
      // @ts-ignore
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
};
