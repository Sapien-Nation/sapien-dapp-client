import { BaseEditor, Editor, Transforms } from 'slate';

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
  const { isInline, isVoid } = editor;

  editor.isVoid = (element) => {
    return (element as any).type === 'image' ? true : isVoid(element);
  };

  editor.isInline = (element: any) => {
    return element.type === 'image' ? true : isInline(element);
  };

  Transforms.insertNodes(editor, {
    children: [{ text: data.key || '' }],
    // @ts-ignore
    type: 'image',
    url: data.url,
    data,
    removeMethod,
  });

  Editor.insertBreak(editor);

  return editor;
};
