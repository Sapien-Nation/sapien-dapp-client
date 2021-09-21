import { BaseEditor, Editor, Element as SlateElement, Transforms } from 'slate';

export const isElementActive = (editor: BaseEditor, type: string) => {
  const [element] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === (type as any),
  });
  return !!element;
};

export const unwrapElement = (editor: BaseEditor, type: string) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === (type as any),
  });
};
