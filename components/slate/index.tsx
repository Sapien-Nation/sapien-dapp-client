import { StyleHTMLAttributes, useMemo, useState } from 'react';
import { withHistory } from 'slate-history';
import { BaseEditor, createEditor, Descendant } from 'slate';
import {
  DefaultLeaf,
  Editable,
  ReactEditor,
  Slate,
  withReact,
} from 'slate-react';
import { tw } from 'twind';

// context
import { useAuth } from 'context/user';

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
  const { me } = useAuth();
  console.log('me', me);
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
    <div className={tw`max-w-2xl flex w-full mt-6`}>
      <img
        className="inline-block h-10 w-10 rounded-full mr-4"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
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
          className={tw`w-full bg-gray-50 rounded-xl px-4 py-2`}
        />
      </Slate>
    </div>
  );
};

export default EditorField;
