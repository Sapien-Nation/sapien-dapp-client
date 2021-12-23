import { Popover, Transition } from '@headlessui/react';
import {
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import pipe from 'lodash/fp/pipe';
import { useMemo, useRef, useState } from 'react';
import { withHistory } from 'slate-history';
import { BaseEditor, createEditor } from 'slate';
import { ReactEditor, withReact } from 'slate-react';
import { tw } from 'twind';

// components
import { ExpandedEditor, NormalEditor } from './mainSquare';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { ElementType } from './constants';

// hooks
import { useEditorConfig, useImage } from './hooks';

// types
import type { CustomElement, CustomText } from './types';

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

const createEditorWithPlugins = pipe(withReact, withHistory);

const EditorField = () => {
  const [view, setView] = useState<View>(View.Normal);
  const [value, setValue] = useState<Array<CustomElement>>([
    {
      children: [{ text: '' }],
      type: ElementType.Paragraph,
      key: null,
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  //--------------------------------------------------------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFetching(true);
    try {
      console.log(`submitting...`);
      // TODO serializer and API call
    } catch (error) {
      toast({
        message:
          error ||
          'Error while creating the content, please try again in 10seconds',
      });
    }
    setIsFetching(false);
  };

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div
        className={tw`flex items-center w-full mt-6 max-w-4xl rounded-2xl bg-white px-6 py-8 relative ${
          isFetching ? 'cursor-wait' : 'cursor-default'
        }`}
      >
        <img
          className={tw`self-start inline-block h-10 w-10 rounded-full mr-4`}
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
        {view === View.Normal && (
          <form
            className={tw`w-full bg-gray-50 rounded-xl px-4 py-2 flex flex-row`}
            onSubmit={handleSubmit}
          >
            <NormalEditor
              defaultValue={value}
              setView={(newValue) => {
                setValue(newValue);
                setView(View.Expanded);
              }}
            />
          </form>
        )}

        {view === View.Expanded && (
          <form
            className={tw`w-full rounded-xl px-4 py-2 flex flex-row pt-32 text-black`}
            onSubmit={handleSubmit}
          >
            <ExpandedEditor
              setView={(newValue) => {
                setValue(newValue);
                setView(View.Normal);
              }}
              defaultValue={value}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default EditorField;
