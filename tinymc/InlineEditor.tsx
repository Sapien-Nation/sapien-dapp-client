import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// context
import { useAuth } from 'context/user';

interface Props {
  editorRef: any;
  initialValue: any;
  onChange: (content: string) => void;
}

const EditorComponent = ({ editorRef, initialValue, onChange }: Props) => {
  const { me } = useAuth();

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

        placeholder: `Whats on your mind ${me.username}?`,
        plugins: ['autolink', 'lists', 'link', 'image', 'media', 'preview'],
        content_style: `
          .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: #656067;
          }

          .mce-content-body {
            color: #ffffff;
            background-color: #161527;
            padding-right: 20px;
          }

          .mce-content-body > p {
            padding-right: 200px
          }

          * [contentEditable="true"]:focus { outline: 0px ; }
        `,
      }}
      onEditorChange={onChange}
    />
  );
};

export default EditorComponent;
