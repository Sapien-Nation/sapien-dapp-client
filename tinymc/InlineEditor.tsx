import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// helpers
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
      initialValue={initialValue}
      onInit={(_, editor) => (editorRef.current = editor)}
      apiKey={apiKey}
      init={{
        height: '100%',
        inline: true,
        resize: false,
        branding: false,
        statusbar: false,
        menubar: false,
        toolbar: false,
        auto_focus: true,
        file_picker_types: 'image',
        automatic_uploads: true,
        images_upload_credentials: true,
        images_file_types: 'jpg,jpeg,png,gif',
        mediaembed_max_width: 450,
        image_dimensions: false,
        image_description: false,
        file_picker_callback: filePicker,
        images_upload_handler: imageHandler,
        placeholder: 'Title',
        plugins: [
          'autolink',
          'lists',
          'link',
          'image',
          'media',
          'preview',
          'emoticons',
        ],
        extended_valid_elements: 'a[href|target=_blank]',
        link_target_list: false,
        content_style: `
          .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: #656067;
            font-size: 2em;
            line-height: 24px;
          }

          .mce-content-body {
            color: #ffffff;
            background-color: #161527;
          }

          .mce-content-body > p:first-of-type {
            font-size: 2em;
            line-height: 34px;
            font-weight: 700;
          }

          .mce-content-body:hover {
            cursor: text;
          }

          .mce-content-body > p > a {
            color: #3b82f6;
            text-decoration: underline;
          }

          .mce-content-body > a {
            color: #3b82f6;
            text-decoration: underline;
          }

          * [contentEditable='true']:focus {
            outline: 0px;
          }
        `,
      }}
      onEditorChange={onChange}
    />
  );
};

export default EditorComponent;
