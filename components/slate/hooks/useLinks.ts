import {
  BaseEditor,
  Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from 'slate';

type LinkElement = { type: 'link'; url: string; children: Array<Descendant> };

const unwrapLink = (editor: BaseEditor) => {
  // @ts-ignore
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === ('link' as any),
  });
};

const wrapLink = (editor: BaseEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    // @ts-ignore
    Transforms.insertNodes(editor, link as any);
  } else {
    // @ts-ignore
    Transforms.wrapNodes(editor, link as any, { split: true });
    // @ts-ignore
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const isLinkActive = (editor: BaseEditor) => {
  // @ts-ignore
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === ('link' as any),
  });
  return !!link;
};

export default wrapLink;
