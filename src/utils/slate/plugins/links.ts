import {
  Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from 'slate';
import { checkUrl } from 'utils/url';

type LinkElement = { type: 'link'; url: string; children: Array<Descendant> };

export const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && checkUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && checkUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === ('link' as any),
  });
};

const wrapLink = (editor, url) => {
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
    Transforms.insertNodes(editor, link as any);
  } else {
    Transforms.wrapNodes(editor, link as any, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === ('link' as any),
  });
  return !!link;
};
