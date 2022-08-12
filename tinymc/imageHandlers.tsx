import { uploadContentMedia } from 'api/content';

type Media = {
  key: string;
  url: string;
};

export const imageHandler = async (blobInfo, ...rest) => {
  console.log({ rest });
  const formData = new FormData();

  formData.append('file', blobInfo.blob());

  const fileData: Media = await uploadContentMedia(formData);
  return Promise.resolve(fileData.url);
};

export const filePicker = (cb, value, meta) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  // input.setAttribute('accept', 'image/*');

  input.onchange = function (event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();

    reader.onload = async function () {
      const blobUrl = window.URL.createObjectURL(file);
      /* call the callback and populate the Title field with the file name */
      cb(blobUrl, { title: file.name });
    };
    reader.readAsDataURL(file);
  };

  input.click();
};
