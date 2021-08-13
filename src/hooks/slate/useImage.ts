import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import { v4 as uuidv4 } from 'uuid';
import { ReactEditor } from 'slate-react';

// api
import { uploadContentImage } from 'api/content';

const useImageUploadHandler = (editor, selection) => {
  return useCallback(
    (event) => {
      event.preventDefault();
      const files = event.target.files;
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      const fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);

      const id = uuidv4();

      Transforms.insertNodes(
        editor,
        [
          {
            // @ts-ignore
            id,
            key: null,
            type: 'image',
            caption: fileName,
            url: null,
            isUploading: true,
            removeMethod: () => {
              editor.selection &&
                Transforms.delete(editor, {
                  at: editor.selection,
                  unit: 'block',
                });

              ReactEditor.focus(editor);
            },
            children: [{ text: '' }],
          },
          {
            // @ts-ignore
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
        { at: selection, select: true }
      );

      uploadContentImage(formData)
        .then((response) => {
          const newImageEntry = Editor.nodes(editor, {
            // @ts-ignore
            match: (n) => n.id === id,
          });

          if (newImageEntry == null) {
            return;
          }

          Transforms.setNodes(
            editor,
            // @ts-ignore
            { isUploading: false, ...response },
            { at: newImageEntry[1] }
          );
        })
        .catch(() => {
          // TODO handle image error
          // Fire another Transform.setNodes to set an upload failed state on the image
        });
    },
    [editor, selection]
  );
};

export default useImageUploadHandler;
