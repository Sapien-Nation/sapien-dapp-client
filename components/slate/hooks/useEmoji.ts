import { useCallback } from 'react';
import { ReactEditor } from 'slate-react';

const useEmoji = (editor, selection) => {
  return useCallback(
    (event) => {
      editor.insertText(`${event.native} `);
      ReactEditor.focus(editor);
    },
    [editor]
  );
};

export default useEmoji;
