import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMC_API_KEY;
  return (
    <Editor
      apiKey={apiKey}
      init={{
        height: '100%',
        width: '100%',
        resize: false,
        branding: false,
        statusbar: false,
      }}
    />
  );
};

export default EditorComponent;
