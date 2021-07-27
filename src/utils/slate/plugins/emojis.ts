import { BaseEditor, Descendant, Range, Transforms } from 'slate';

type EmojiElement = {
  type: 'emoji';
  emoji: string;
  children: Array<Descendant>;
};

export const withEmojis = (editor: BaseEditor, emoji: string) => {
  const { isInline, isVoid } = editor;

  editor.isVoid = (element: any) => {
    return element.type === 'emoji' ? true : isVoid(element);
  };

  editor.isInline = (element: any) => {
    return element.type === 'emoji' ? true : isInline(element);
  };

  wrapEmoji(editor, emoji);

  return editor;
};

const wrapEmoji = (editor: BaseEditor, emoji: string) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const emojiElement: EmojiElement = {
    type: 'emoji',
    emoji,
    children: isCollapsed ? [{ text: emoji }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, emojiElement as any);
  } else {
    Transforms.wrapNodes(editor, emojiElement as any, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};
