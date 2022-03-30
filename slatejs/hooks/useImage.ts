import { useCallback, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { v4 as uuidv4 } from 'uuid';
import { ReactEditor } from 'slate-react';

// api
import { uploadContentMedia } from 'api/content';

// constants
import { ElementType } from '../constants';

// context
import { useToast } from 'context/toast';

// types
import type { CustomElement } from '../types';

const useImageUploadHandler = (editor) => {
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();

  const handler = useCallback(
    async (event) => {
      setIsFetching(true);
      event.preventDefault();

      const file = event.target.files[0];
      const id = uuidv4();
      const { name } = file;

      const formData = new FormData();
      formData.append('file', file);

      Transforms.insertNodes(
        editor,
        [
          {
            id,
            key: null,
            type: ElementType.Image,
            caption: name,
            url: null,
            isFetching: true,
            onRemove: () => {},
            children: [{ text: '' }],
          },
        ],
        { select: true }
      );

      const newImageEntry = Editor.nodes(editor, {
        match: (n: CustomElement) => n.id === id,
      });

      if (newImageEntry === null) return;

      try {
        const { url, original, key } = await uploadContentMedia(formData);
        Transforms.setNodes(
          editor,
          {
            id,
            isFetching: false,
            imageFallback: original,
            url,
            type: ElementType.Image,
            onRemove: () => {
              editor.selection &&
                Transforms.delete(editor, {
                  at: editor.selection,
                  unit: 'block',
                });

              ReactEditor.focus(editor);
            },
            key,
          },
          { at: newImageEntry[1] }
        );

        Transforms.insertNodes(
          editor,
          [
            {
              type: ElementType.Paragraph,
              children: [{ text: '' }],
            },
          ],
          { select: true }
        );
        ReactEditor.focus(editor);
      } catch (err) {
        Transforms.setNodes(
          editor,
          {
            id,
            isFetching: false,
            imageFallback:
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png',
            url: 'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png',
            type: ElementType.Image,
            onRemove: () => {
              editor.selection &&
                Transforms.delete(editor, {
                  at: editor.selection,
                  unit: 'block',
                });

              ReactEditor.focus(editor);
            },
            key: null,
          },
          { at: newImageEntry[1] }
        );
        toast({
          message: 'Error Uploading Image',
        });
      }
      setIsFetching(false);
      event.target.value = null;
    },
    [editor, toast]
  );

  return { handler, isFetching };
};

export default useImageUploadHandler;
