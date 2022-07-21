import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { imageHandler, filePicker } from './imageHandlers';

interface Props {
  editorRef: any;
  initialValue: any;
}

const EditorComponent = ({ editorRef, initialValue }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMC_API_KEY;
  return (
    <Editor
      onInit={(_, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      apiKey={apiKey}
      init={{
        height: '100%',
        width: '100%',
        resize: false,
        branding: false,
        statusbar: false,
        menubar: false,
        auto_focus: true,
        mobile: {
          toolbar_drawer: 'floating',
        },
        skin: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'oxide-dark'
          : 'oxide',
        plugins: ['autolink', 'lists', 'link', 'image', 'media', 'preview'],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic | alignleft aligncenter ' +
          'alignright alignjustify | ' +
          'link image',
        automatic_uploads: true,
        images_upload_credentials: true,
        image_dimensions: false,
        image_description: false,
        file_picker_types: 'image',
        file_picker_callback: filePicker,
        images_upload_handler: imageHandler,
        content_style: `
          .mce-content-body {
            color: #ffffff;
            background-color: #161527;
          }

          * [contentEditable="true"]:focus { outline: 0px ; }
        `,
      }}
    />
  );
};

export default EditorComponent;
