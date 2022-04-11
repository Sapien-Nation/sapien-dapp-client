import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMC_API_KEY;
  return <Editor apiKey={apiKey} />;
};

export default EditorComponent;
