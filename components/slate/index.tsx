import { Popover, Transition } from '@headlessui/react';
import {
  ArrowsExpandIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import pipe from 'lodash/fp/pipe';
import { Fragment, useMemo, useRef, useState } from 'react';
import { withHistory } from 'slate-history';
import { BaseEditor, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { tw } from 'twind';

// components
import { Overlay, Tooltip } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { ElementType } from './constants';

// hooks
import { useEditorConfig, useImage } from './hooks';

// utils
import { insertEmoji } from './utils';

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
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [view, setView] = useState<View>(View.Normal);
  const [value, setValue] = useState<Array<CustomElement>>([
    {
      children: [{ text: '' }],
      type: ElementType.Paragraph,
      key: null,
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);

  const { renderLeaf, renderElement } = useEditorConfig(editor);

  const fileRef = useRef(null);
  const tooltipRef = useRef(null);

  const { me } = useAuth();
  const toast = useToast();
  //--------------------------------------------------------------------------------------------------------------------
  const { handler: handleAddImage, isFetching: isUploadingImage } =
    useImage(editor);

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
        className={tw`flex items-center w-full mt-6 max-w-4xl rounded-2xl bg-white px-6 py-8 ${
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
            <Slate
              editor={editor}
              value={value}
              onChange={(val: any) => setValue(val)}
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
                className={tw`h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white pointer-events-auto`}
                disabled={isUploadingImage}
                onClick={handleSubmit}
              >
                <PaperAirplaneIcon
                  className={tw`h-6 w-6 rotate-90 text-indigo-500`}
                />
              </button>
            </div>
          </form>
        )}

        <Overlay
          actionIcon={<XIcon className="h-6 w-6" aria-hidden="true" />}
          show={view === View.Expanded}
          onClose={() => {
            setView(View.Normal);
            ReactEditor.focus(editor);
          }}
        >
          <form
            className={tw`w-full rounded-xl px-4 py-2 flex flex-row pt-32 text-black`}
            onSubmit={handleSubmit}
          >
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
                <PaperAirplaneIcon
                  className={tw`h-6 w-6 rotate-90 text-indigo-500`}
                />
              </button>
            </div>
          </form>
        </Overlay>

        {/* Expand */}
        {view === View.Normal && (
          <button
            className={tw`self-end h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white`}
            onClick={() => {
              setView(View.Expanded);
              ReactEditor.focus(editor);
            }}
            ref={tooltipRef.current?.setTriggerRef}
          >
            <ArrowsExpandIcon className={tw`h-6 w-6`} />
          </button>
        )}

        <Tooltip
          ref={tooltipRef}
          text="Use the expanded view version for better experience (BETA)"
        />
      </div>
    </>
  );
};

export default EditorField;
