import { BaseEditor, Transforms } from 'slate';

// api
import { uploadContentImage } from 'api/content';

export const handleUploadImage = async (
  event: any,
  editor: BaseEditor,
  removeImage: () => void,
  notification?: any
) => {
  try {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      const data = await uploadContentImage(formData);

      //TODO - data.url
      const image = {
        type: 'image',
        url: data?.url,
        children: [{ text: '' }],
        removeMethod: removeImage,
      };

      Transforms.insertNodes(editor, image);

      notification('Image added successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });

      return editor;
    }
  } catch (error) {
    notification(error, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  }
};
