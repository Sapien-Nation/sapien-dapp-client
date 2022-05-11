// @refresh reset
import _pipe from 'lodash/fp/pipe';
import { Popover, Transition } from '@headlessui/react';
import { EmojiHappyIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/solid';
import { Picker } from 'emoji-mart';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Editor, createEditor, Transforms, Range } from 'slate';
import {
  Slate,
  Editable,
  useSelected,
  useFocused,
  withReact,
} from 'slate-react';
import { withHistory } from 'slate-history';

// components
import { UserAvatar } from 'components/common';

// context
import { useAuth } from 'context/user';

// constants
import { defaultValue, ElementType } from '../constants';

// hooks
import { usePassport } from 'hooks/passport';

// utils
import { insertEmoji, serialize, insertMention, withMentions } from '../utils';

// types
import type { EditableProps } from 'slate-react/dist/components/editable';

interface Props {
  name: string;
  onSubmit: (text: string) => void;
  slateProps?: EditableProps;
}

const editorID = 'slatejs-editor';
const RoomEditor = ({ name, onSubmit, slateProps = {} }: Props) => {
  const [value, setValue] = useState<Array<any>>(defaultValue);
  const [attachments, setAttachments] = useState<Array<File>>([]);
  const [target, setTarget] = useState<Range | undefined>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const { me } = useAuth();
  const passport = usePassport();

  const MEMBERLIST = [
    {
      id: '1',
      username: 'sabbir',
      avatar:
        'https://d151dmflpumpzp.cloudfront.net/thumbnails/profiles/avatar/c1f486a7-96d5-4940-a9c4-15537384dd12-110x110.jpeg',
    },
    {
      id: '2',
      username: 'ethaan',
      avatar:
        'https://d151dmflpumpzp.cloudfront.net/thumbnails/profiles/avatar/c84bf641-0d8d-4f43-b298-62d3a1eb02f6-110x110.jpeg',
    },
  ];

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const text = serialize(value);

      onSubmit(text);

      // cleanup
      const point = { path: [0, 0], offset: 0 };
      editor.selection = { anchor: point, focus: point };
      editor.history = { redos: [], undos: [] };
      editor.children = [
        {
          children: [{ text: '' }],
          // @ts-ignore
          type: ElementType.Paragraph,
          key: null,
        },
      ];
      setValue(defaultValue);
    },
    [editor, onSubmit, value]
  );

  const Element = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case 'mention':
        return <Mention {...props} />;
      default:
        return <p {...attributes}>{children}</p>;
    }
  };

  const Mention = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
      <span
        {...attributes}
        contentEditable={false}
        className={`${
          selected && focused ? 'shadow-md' : 'none'
        } p-1 mx-1 align-baseline inline-block rounded bg-gray-700 text-gray-300 text-xs`}
      >
        @{element.member?.username}
        {children}
      </span>
    );
  };

  const members = MEMBERLIST.filter(({ username }) =>
    username.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= members.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? members.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, members[index]);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }

      if (event.key === 'Enter' && !event.shiftKey && !target) {
        handleSubmit(event);
      }
    },
    [index, target, editor, handleSubmit, members]
  );

  return (
    <>
      {target && members.length > 0 && (
        <div className="bg-gray-800 rounded-md p-3 z-10 mb-1 max-h-96 overflow-auto">
          <h3 className="text-sm">Members</h3>
          {members.map(({ id, avatar, username }, idx) => (
            <div
              key={id}
              className={`${
                idx === index ? 'bg-gray-900' : ''
              } mt-3 py-2 px-3 rounded-md`}
            >
              <div className="flex items-center gap-2">
                {avatar && (
                  <img
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    src={avatar}
                    alt={username}
                  />
                )}
                {!avatar && username && (
                  <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                    {username[0].toUpperCase()}
                  </div>
                )}
                {username}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center w-full bg-sapien-neutral-600 rounded-xl shadow px-6 py-6 relative cursor-default">
        {/* Avatar */}
        <div className="mr-4 w-12 hidden sm:block">
          <UserAvatar user={me} passport={passport} />
        </div>
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

          <div className="flex">
            <Slate
              editor={editor}
              value={value}
              onChange={(val: any) => {
                setValue(val);
                const { selection } = editor;

                if (selection && Range.isCollapsed(selection)) {
                  const [start] = Range.edges(selection);
                  const wordBefore = Editor.before(editor, start, {
                    unit: 'word',
                  });
                  const before =
                    wordBefore && Editor.before(editor, wordBefore);
                  const beforeRange =
                    before && Editor.range(editor, before, start);
                  const beforeText =
                    beforeRange && Editor.string(editor, beforeRange);
                  const beforeMatch =
                    beforeText && beforeText.match(/^@(\w+)$/);
                  const after = Editor.after(editor, start);
                  const afterRange = Editor.range(editor, start, after);
                  const afterText = Editor.string(editor, afterRange);
                  const afterMatch = afterText.match(/^(\s|$)/);

                  if (beforeMatch && afterMatch) {
                    setTarget(beforeRange);
                    setSearch(beforeMatch[1]);
                    setIndex(0);
                    return;
                  }
                }

                setTarget(null);
              }}
            >
              <Editable
                renderElement={renderElement}
                onKeyDown={onKeyDown}
                placeholder={`Leave a message on ${name}`}
                className="max-w-250 w-full py-2 break-all"
                {...slateProps}
              />
            </Slate>

            <div className="flex justify-end items-end gap-1">
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
              {serialize(value).length > 0 && (
                <button
                  className="h-10 w-10 flex items-center text-gray-400 justify-center rounded-md hover:bg-gray-100 focus:bg-indigo-700 focus:text-white pointer-events-auto"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <PaperAirplaneIcon className="h-6 w-6 rotate-90 text-indigo-500" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RoomEditor;
