import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// components
import { DefaultEditor } from './editors';

// context
import { useAuth } from 'context/user';

// types
import type { CustomElement, CustomText } from './types';
import { mergeClassNames } from 'utils/styles';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

enum View {
  Expanded,
  Normal,
}

interface Props {
  onSubmit: (values: any) => void;
  isFetching: boolean;
}

const EditorField = ({ onSubmit, isFetching }: Props) => {
  const { me } = useAuth();
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div
        className={mergeClassNames(
          isFetching ? 'cursor-wait' : 'cursor-default',
          'flex items-center w-full bg-white rounded-2xl shadow px-6 py-8 relative '
        )}
      >
        {/* Avatar */}
        <img
          className="self-start inline-block h-10 w-10 rounded-full mr-4"
          src={
            me.avatar ||
            'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png'
          }
          alt="This is your profile picture"
          onError={(event) => {
            (event.target as HTMLImageElement).src =
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png';
          }}
        />

        {/* Editor */}
        <DefaultEditor isFetching={isFetching} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default EditorField;
