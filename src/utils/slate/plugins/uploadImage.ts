import { BaseEditor, Transforms } from 'slate';

export const addImageToEditor = async ({
  data,
  editor,
  removeMethod,
}: {
  data: {
    url: string;
    original: string;
    key: string;
  };
  editor: BaseEditor;
  removeMethod: () => void;
}) => {
  Transforms.insertNodes(editor, {
    children: [{ text: data.key }],
    type: 'image',
    url: data.url,
    data,
    removeMethod,
  });

  return editor;
};
