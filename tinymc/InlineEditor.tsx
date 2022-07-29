import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// types
import type { Channel } from 'tools/types/channel';

interface Props {
  channel: Channel;
  editorRef: any;
  initialValue: any;
  onChange: (content: string) => void;
}

const EditorComponent = ({
  channel,
  editorRef,
  initialValue,
  onChange,
}: Props) => {
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

        placeholder: `What do you want to share in ${channel.name}?`,
        plugins: ['autolink', 'lists', 'link', 'image', 'media', 'preview'],
        content_style: `
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: #656067;
        }
        
        .mce-content-body {
            color: #ffffff;
            background-color: #161527;
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
          * [contentEditable="true"]:focus { outline: 0px ; }
        `,
      }}
      onEditorChange={onChange}
    />
  );
};

export default EditorComponent;
