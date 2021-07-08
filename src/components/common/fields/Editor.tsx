import { Editable, Slate } from 'slate-react';

// utils
import { Element, Leaf } from 'utils/slate';

interface Props {
  editor: any;
  editorProps: any;
  value: any;
  onChange: (editor: any) => void;
}

const Editor = ({ editor, editorProps = {}, value, onChange }: Props) => {
  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      {/* <Toolbar>
        <MarkButton format="bold" />
        <MarkButton format="italic" />
        <MarkButton format="underline" />
        <MarkButton format="code" />
      </Toolbar> */}
      <Editable
        spellCheck
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Leaf {...props} />}
        style={{
          padding: '0.7rem 1.5rem',
          width: '100%',
        }}
        {...editorProps}
      />
    </Slate>
  );
};

export default Editor;
