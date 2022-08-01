import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { imageHandler, filePicker } from './imageHandlers';

interface Props {
  editorRef: any;
  initialValue: any;
  onChange: (content: string) => void;
}

const EditorComponent = ({ editorRef, initialValue, onChange }: Props) => {
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
        extended_valid_elements: 'a[href|target=_blank]',
        link_target_list: false,
        content_style: `
          .mce-content-body {
            color: #ffffff;
            background-color: #161527;
          }

          .mce-content-body > p > a {
            color: #3b82f6;
            text-decoration: underline;
          }

          .mce-content-body > a {
            color: #3b82f6;
            text-decoration: underline;
          }
          
          * [contentEditable="true"]:focus { outline: 0px ; }
        `,
      }}
      onEditorChange={onChange}
    />
  );
};

export default EditorComponent;
