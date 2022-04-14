// @refresh reset
import _pipe from 'lodash/fp/pipe';
import { Popover, Transition } from '@headlessui/react';
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/solid';
import { Picker } from 'emoji-mart';
import { Fragment, useMemo, useRef, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

// constants
import { defaultValue } from '../constants';

// utils
import { insertEmoji, serialize } from '../utils';

// types
import type { EditableProps } from 'slate-react/dist/components/editable';

const createEditorWithPlugins = _pipe(withReact, withHistory);

interface Props {
  name: string;
  onSubmit: (text: string) => void;
  slateProps?: EditableProps;
}

const editorID = 'slatejs-editor';
const RoomEditor = ({ name, onSubmit, slateProps = {} }: Props) => {
  const [value, setValue] = useState<Array<any>>(defaultValue);
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

  const [attachments, setAttachments] = useState<Array<File>>([]);

  const fileRef = useRef(null);

  return (
    <>
      <div className="flex items-center w-full bg-sapien-neutral-600 rounded-xl shadow px-6 py-6 relative cursor-default">
        {/* Avatar */}
        <img
          className="self-start inline-block h-10 w-10 rounded-full mr-4"
          src={
            'https://cdn.discordapp.com/avatars/557967782516490270/6a43bfb06a8150801b5c3407c8103339.webp?size=240'
          }
          alt=""
        />
        <form
          id="room-editor"
          className="w-full bg-sapien-neutral-800 rounded-xl border px-4 py-2"
        >
          {attachments.length > 0 ? (
            <ul className="py-3 flex flex-wrap gap-3">
              {attachments.map((attachment, index) => (
                <li key={index} id={editorID} className="relative mr-3">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={URL.createObjectURL(attachment)}
                    alt={`Attachment ${index + 1}`}
                  />
                  <button
                    className="absolute top-0 right-0"
                    onClick={() => {
                      setAttachments(
                        attachments.filter(
                          (_, elementIndex) => index !== elementIndex
                        )
                      );
                    }}
                  >
                    <TrashIcon className="w-5 text-sapien-red-700" />
                    <span className="sr-only">Remove attachment</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex flex-row">
            <Slate
              editor={editor}
              value={value}
              onChange={(val: any) => setValue(val)}
            >
              <Editable
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();

                    const text = serialize(value);
                    onSubmit(text);

                    // cleanup
                    const point = { path: [0, 0], offset: 0 };
                    editor.selection = { anchor: point, focus: point };
                    editor.history = { redos: [], undos: [] };

                    setValue(defaultValue);
                  }
                }}
                placeholder={`Leave a message on ${name}`}
                className="w-full py-2 break-all"
                {...slateProps}
              />
            </Slate>

            <div className="flex justify-end items-end gap-1">
              {/* File Upload */}
              {/* <button
                className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:text-lime-600 focus:text-green-700"
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
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setAttachments([...attachments, event.target.files[0]]);
                  }
                }}
                type="file"
              /> */}

              {/* Emoji */}
              <Popover className="relative">
                {() => (
                  <>
                    <Popover.Button
                      disabled={slateProps?.readOnly}
                      className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:text-yellow-400 focus:text-yellow-500"
                    >
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
                      <Popover.Panel className="absolute z-10 right-0 transform -translate-x-1/2 mt-3 px-2 w-500 sm:px-0">
                        <Popover.Button>
                          <Picker
                            onSelect={(event) => insertEmoji(editor, event)}
                            perLine={6}
                            style={{
                              position: 'absolute',
                              bottom: 60,
                              right: 0,
                              width: '430px',
                            }}
                            theme="dark"
                            disableAutoFocus={true}
                            groupNames={{ smileys_people: 'PEOPLE' }}
                            native
                            showPreview={false}
                            title=""
                          />
                        </Popover.Button>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoomEditor;
