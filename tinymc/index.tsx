import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  editorRef: HTMLElement;
}

const EditorComponent = ({ editorRef }) => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMC_API_KEY;
  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
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
