import { Popover, Transition } from '@headlessui/react';
import {
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import pipe from 'lodash/fp/pipe';
import { Fragment, useMemo, useRef, useState } from 'react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { tw } from 'twind';

// components
import { Overlay } from 'components/common';

// icons
import { CollapseIcon } from 'assets';

// hooks
import { useEditorConfig, useImage } from '../hooks';

// utils
import { insertEmoji } from '../utils';

// types
import type { CustomElement } from '../types';

const createEditorWithPlugins = pipe(withReact, withHistory);

interface Props {
  defaultValue: Array<CustomElement>;
  setView: (value: Array<CustomElement>) => void;
}

const ExpandedEditor = ({ defaultValue, setView }: Props) => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Array<CustomElement>>(defaultValue);

  const { renderLeaf, renderElement } = useEditorConfig(editor);

  const fileRef = useRef(null);
  //--------------------------------------------------------------------------------------------------------------------
  const { handler: handleAddImage, isFetching: isUploadingImage } =
    useImage(editor);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Overlay
      actionIcon={
        <CollapseIcon className="h-4 w-4 fill-white" aria-hidden="true" />
      }
      show
      onClose={() => {
        setView(value);
      }}
    >
      <div className={tw`pt-20`}>
        <Slate
          editor={editor}
          value={value}
          onChange={(doc: any) => setValue(doc)}
        >
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
                    <Picker onSelect={(event) => insertEmoji(editor, event)} />
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
            type="submit"
          >
            <PaperAirplaneIcon
              className={tw`h-6 w-6 rotate-90 text-indigo-500`}
            />
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default ExpandedEditor;
