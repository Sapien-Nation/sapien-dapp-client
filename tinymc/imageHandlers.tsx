import { uploadContentMedia } from 'api/content';

type Media = {
  key: string;
  url: string;
};

export const imageHandler = async (blobInfo) => {
  return Promise.resolve(blobInfo);
};

export const filePicker = (cb, value, meta) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');

  if (meta.filetype === 'media') {
    input.setAttribute('accept', 'video/* audio/*');
  } else {
    input.setAttribute('accept', 'image/*');
  }

  input.onchange = function (event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();

    reader.onload = async function () {
      const formData = new FormData();

      formData.append('file', file);

      const fileData: Media = await uploadContentMedia(formData);
      /* call the callback and populate the Title field with the file name */
      cb(fileData.url, { title: file.name });
    };
    reader.readAsDataURL(file);
  };

  input.click();
};
