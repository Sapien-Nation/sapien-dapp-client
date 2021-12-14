import { useMemo, useState } from 'react';
import { withHistory } from 'slate-history';
import { BaseEditor, createEditor, Descendant } from 'slate';
import {
  DefaultLeaf,
  Editable,
  ReactEditor,
  Slate,
  withReact,
} from 'slate-react';

// import 'emoji-mart/css/emoji-mart.css'; TODO emoji picker

enum ElementType {
  Paragraph = 'paragraph',
}

type CustomElement = { type: ElementType; children: Array<CustomText> };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const EditorField = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState<Array<Descendant>>([
    {
      type: ElementType.Paragraph,
      children: [{ text: '' }],
    },
  ]);

  //--------------------------------------------------------------------------------------------------------------------
  const renderLeaf = (props) => {
    return <DefaultLeaf {...props} />;
  };

  const renderElement = ({ attributes, children }) => {
    return <p {...attributes}>{children}</p>;
  };

  //--------------------------------------------------------------------------------------------------------------------
  const handleKeyDown = (event) => {
    console.log(event.key);
  };

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable
          spellCheck
          placeholder="What do you want to share?"
          onKeyDown={handleKeyDown}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />
      </Slate>
    </div>
  );
};

export default EditorField;
