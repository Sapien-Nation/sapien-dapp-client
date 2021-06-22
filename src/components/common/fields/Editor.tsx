import { useState } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { Slate, Editable, ReactEditor, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface Props {
  onChange: (data: Array<Descendant>) => void;
  username: string;
  value: Array<Descendant>;
}

const Editor = ({ username, value, onChange }: Props) => {
  const [editor] = useState(withHistory(withReact(createEditor())));

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable placeholder={`What’s on your mind, ${username}?`} />
    </Slate>
  );
};

export default Editor;
