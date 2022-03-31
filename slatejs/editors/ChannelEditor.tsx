import { Popover, Transition } from '@headlessui/react';
import {
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PhotographIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import pipe from 'lodash/fp/pipe';
import { Fragment, useMemo, useRef, useState } from 'react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { Spinner } from 'components/common';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// constants
import { ElementType } from '../constants';

// context
import { useAuth } from 'context/user';

// hooks
import { useDecorator, useEditorConfig, useImage } from '../hooks';

// utils
import { insertEmoji } from '../utils';
import { mergeClassNames } from 'utils/styles';

// types
import type { CustomElement, CustomText } from '../types';

const createEditorWithPlugins = pipe(withReact, withHistory);

interface Props {
  defaultValue?: Array<CustomElement>;
  isFetching?: boolean;
  onSubmit: (value: Array<CustomElement>, editor: any) => void;
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const ChannelEditor = ({
  defaultValue = [
    {
      children: [{ text: '' }],
      type: ElementType.Paragraph,
      key: null,
    },
  ],
  isFetching = false,
  onSubmit,
}: Props) => {
  const { me } = useAuth();
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState<Array<CustomElement>>(defaultValue);

  const fileRef = useRef(null);

  const { renderLeaf, renderElement } = useEditorConfig(editor);
  //--------------------------------------------------------------------------------------------------------------------
  const { handler: handleAddImage, isFetching: isUploadingImage } =
    useImage(editor);
  const decorator = useDecorator();
  //--------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div
        className={mergeClassNames(
          isFetching ? 'cursor-wait' : 'cursor-default',
          'flex items-center w-full bg-sapien-neutral-600 rounded-xl shadow px-6 py-6 relative '
        )}
      >
        {/* Avatar */}
        <img
          className="self-start inline-block h-10 w-10 rounded-full mr-4"
          src={
            me.avatar ||
            'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
          }
          alt="This is your profile picture"
          onError={(event) => {
            (event.target as HTMLImageElement).src =
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png';
          }}
        />
        <form
          className={mergeClassNames(
            isFetching ? 'opacity-50' : '',
            'w-full bg-sapien-neutral-800 rounded-xl boder px-4 py-2 flex flex-row'
          )}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(value, editor);
            setValue(defaultValue);
          }}
        >
          {isFetching && <Spinner />}
          <Slate
            editor={editor}
            value={value}
            onChange={(val: any) => setValue(val)}
          >
            <Editable
              decorate={decorator}
              placeholder="What do you want to share?"
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              className="w-full px-4 py-2"
            />
          </Slate>
          <div className="flex justify-end items-end gap-1">
            {/* Emoji Upload */}
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white">
                    <EmojiHappyIcon className="h-6 w-6" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 right-0 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                      <Picker
                        onSelect={(event) => insertEmoji(editor, event)}
                      />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* File Upload */}
            <button
              className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white"
              onClick={(event) => {
                event.preventDefault();
                fileRef.current.click();
              }}
            >
              <PhotographIcon className="h-6 w-6" />
            </button>
            <input
              ref={fileRef}
              accept="image/*"
              className="sr-only"
              onChange={handleAddImage}
              type="file"
            />

            {/* Submit */}
            <button
              className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white pointer-events-auto"
              disabled={isUploadingImage}
              type="submit"
            >
              <PaperAirplaneIcon className="h-6 w-6 rotate-90 text-indigo-500" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChannelEditor;
