import { Popover, Transition } from '@headlessui/react';
import {
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PhotographIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import pipe from 'lodash/fp/pipe';
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
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

// constants
import { ElementType } from './constants';

// hooks
import { useEditorConfig, useEmoji, useImage, useSelection } from './hooks';

// types
import type { CustomElement, CustomText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const createEditorWithPlugins = pipe(withReact, withHistory);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EditorField = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Array<Descendant>>([
    {
      children: [{ text: '' }],
      type: ElementType.Paragraph,
      key: null,
    },
  ]);

  const { renderLeaf, renderElement } = useEditorConfig(editor);
  const [previousSelection, _, setSelection] = useSelection(editor);
  const fileRef = useRef(null);

  const { me } = useAuth();

  //--------------------------------------------------------------------------------------------------------------------
  const { handler: handleAddImage, isFetching: isUploadingImage } = useImage(
    editor,
    previousSelection
  );
  const addEmoji = useEmoji(editor, previousSelection);

  //--------------------------------------------------------------------------------------------------------------------
  const handleSubmit = () => {};
  const handleOnChange = useCallback(
    (doc) => {
      setValue(doc);
      setSelection(editor.selection);
    },
    [setSelection, editor]
  );

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className={tw`max-w-3xl flex items-center w-full mt-6`}>
      <img
        className="inline-block h-10 w-10 rounded-full mr-4"
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
      <div className={tw`w-full bg-gray-50 rounded-xl px-4 py-2 flex flex-row`}>
        <Slate editor={editor} value={value} onChange={handleOnChange}>
          <Editable
            placeholder="What do you want to share?"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            className={tw`w-full px-4 py-2`}
          />
        </Slate>
        <div className={tw`flex justify-end items-end gap-1`}>
          {/* Emoji Upload */}
          <Popover className="relative">
            {() => (
              <>
                <Popover.Button
                  className={tw`h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white`}
                >
                  <EmojiHappyIcon className={tw`h-6 w-6`} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter={tw`transition ease-out duration-200`}
                  enterFrom={tw`opacity-0 translate-y-1`}
                  enterTo={tw`opacity-100 translate-y-0`}
                  leave={tw`transition ease-in duration-150`}
                  leaveFrom={tw`opacity-100 translate-y-0`}
                  leaveTo={tw`opacity-0 translate-y-1`}
                >
                  <Popover.Panel className="absolute z-10 right-0 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                    <Picker onSelect={(event) => addEmoji(event)} />
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {/* File Upload */}
          <button
            className={tw`h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white`}
            onClick={() => fileRef.current.click()}
          >
            <PhotographIcon className={tw`h-6 w-6`} />
          </button>
          <input
            ref={fileRef}
            accept="image/*"
            className={tw`sr-only`}
            onChange={handleAddImage}
            type="file"
          />

          {/* Submit */}
          <button
            className={tw`h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white`}
            disabled={isUploadingImage}
            onClick={handleSubmit}
          >
            <PaperAirplaneIcon className={tw`h-6 w-6`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorField;
