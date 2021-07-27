import { useCallback } from 'react';
import { Transforms } from 'slate';

const useEmoji = (editor, selection) => {
  return useCallback(
    (event) => {
      Transforms.insertNodes(
        editor,
        {
          // @ts-ignore
          type: 'emoji',
          children: [{ text: event.native }],
        },
        { at: selection, select: true }
      );
    },
    [editor, selection]
  );
};

export default useEmoji;
