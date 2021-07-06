import { Editable, Slate } from 'slate-react';

// styles
import { neutral } from 'styles/colors';

// utils
import { Element, Leaf, MarkButton, Toolbar } from 'utils/slate';

interface Props {
  editor: any;
  editorProps: any;
  value: any;
  onChange: (editor: any) => void;
}

const Editor = ({ editor, editorProps = {}, value, onChange }: Props) => {
  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Toolbar>
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <MarkButton format="code" />
      </Toolbar>
      <Editable
        spellCheck
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Leaf {...props} />}
        style={{
          backgroundColor: neutral[50],
          borderRadius: 16,
          padding: '1rem 1.5rem',
        }}
        {...editorProps}
      />
    </Slate>
  );
};

export default Editor;
