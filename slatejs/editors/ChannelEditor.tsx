// @refresh reset
import _pipe from 'lodash/fp/pipe';
import { Popover, Transition } from '@headlessui/react';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { Picker } from 'emoji-mart';
import { Fragment, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

// constants
import { defaultValue } from '../constants';

// utils
import { insertEmoji, serialize } from '../utils';

const createEditorWithPlugins = _pipe(withReact, withHistory);

interface Props {
  onSubmit: (text: string) => void;
  name: string;
}

const ChannelEditor = ({ name, onSubmit }: Props) => {
  const [value, setValue] = useState<Array<any>>(defaultValue);
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);

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
          id="channel-editor"
          className="w-full bg-sapien-neutral-800 rounded-xl border px-4 py-2 flex flex-row"
        >
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
              className="w-full px-4 py-2"
            />
          </Slate>

          <div className="flex justify-end items-end gap-1">
            {/* Emoji */}
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:text-yellow-400 focus:text-yellow-500">
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
                    <Popover.Panel className="absolute z-10 right-0 transform -translate-x-1/2 mt-3 px-2 w-[500px] sm:px-0">
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
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChannelEditor;
