import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// context
import { useAuth } from 'context/user';

interface Props {
  editorRef: any;
  initialValue: any;
}

const EditorComponent = ({ editorRef, initialValue }: Props) => {
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
      }}
    />
  );
};

export default EditorComponent;
