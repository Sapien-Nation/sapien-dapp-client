import { BaseEditor, Descendant, Range, Transforms } from 'slate';

// utils
import { checkUrl, isOnlineVideo } from 'utils/url';
import { wrapOnlineVideo } from 'utils/slate/plugins';
import { isElementActive, unwrapElement } from './helpers';

type LinkElement = { type: 'link'; url: string; children: Array<Descendant> };

export const withLinks = (editor) => {
  const { insertData, insertText, isInline, isVoid } = editor;

  editor.isVoid = (element: any) => {
    return element.type === 'video' ? true : isVoid(element);
  };

  editor.isInline = (element: any) => {
    return element.type === 'link' || element.type === 'video'
      ? true
      : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && checkUrl(text)) {
      if (isOnlineVideo(text)) {
        wrapOnlineVideo(editor, text);
      } else {
        wrapLink(editor, text);
      }
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && checkUrl(text)) {
      if (isOnlineVideo(text)) {
        wrapOnlineVideo(editor, text);
      } else {
        wrapLink(editor, text);
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

const wrapLink = (editor: BaseEditor, url: string) => {
  if (isElementActive(editor, 'link')) {
    unwrapElement(editor, 'link');
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
