import { Editor } from '@tinymce/tinymce-react';

interface Props {
  onSubmit: () => void;
  name: string;
}
const EditorComponent = ({ name }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMC_API_KEY;
  return (
    <Editor
      apiKey={apiKey}
      cloudChannel="6-dev"
      init={{ placeholder: `Post to #${name} ` }}
    />
  );
};

export default EditorComponent;
