import { uploadContentMedia } from 'api/content';

type Media = {
  key: string;
  url: string;
};

export const imageHandler = async (blobInfo, progress) => {
  const formData = new FormData();
  formData.append('file', blobInfo.blob());

  const fileData: Media = await uploadContentMedia(formData);
  return Promise.resolve(fileData.url);
};

export const filePicker = (cb) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  /*
    Note: In modern browsers input[type="file"] is functional without
    even adding it to the DOM, but that might not be the case in some older
    or quirky browsers like IE, so you might want to add it to the DOM
    just in case, and visually hide it. And do not forget do remove it
    once you do not need it anymore.
  */

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
