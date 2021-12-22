import { ReactEditor } from 'slate-react';

export const insertEmoji = (editor, event) => {
  editor.insertText(`${event.native} `);
  ReactEditor.focus(editor);
};
