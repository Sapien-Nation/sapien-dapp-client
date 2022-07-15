// @refresh reset
import _pipe from 'lodash/fp/pipe';
import { Popover, Transition } from '@headlessui/react';
import { EmojiHappyIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/solid';
import { Picker } from 'emoji-mart';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Editor, createEditor, Transforms, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useRouter } from 'next/router';
import data from '@emoji-mart/data';
import { matchSorter } from 'match-sorter';

// components
import { UserAvatar } from 'components/common';
import { Element } from '../components';

// context
import { useAuth } from 'context/user';

// constants
import { defaultValue, ElementType, MentionType } from '../constants';

// hooks
import { usePassport } from 'hooks/passport';
import { useRoomMembers } from 'hooks/room';
import { useTribeRooms } from 'hooks/tribe';

// utils
import {
  insertEmoji,
  serialize,
  insertUserMention,
  withRoomMentions,
  withUserMentions,
  getMentionsArrayFromCacheForUI,
  insertRoomMention,
} from '../utils';

// types
import type { EditableProps } from 'slate-react/dist/components/editable';

interface Props {
  name: string;
  onSubmit: (text: string) => void;
  slateProps?: EditableProps;
}

enum FloatMenu {
  Channels,
  Members,
  Emoji,
}

const editorID = 'slatejs-editor';
const RoomEditor = ({ name, onSubmit, slateProps = {} }: Props) => {
  const [value, setValue] = useState<Array<any>>(defaultValue);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState<Range | undefined>();
  const [attachments, setAttachments] = useState<Array<File>>([]);
  const [floatMenu, setFloatMenu] = useState<FloatMenu | null>(null);

  const { query } = useRouter();
  const editor = useMemo(
    () =>
      withRoomMentions(
        withUserMentions(withReact(withHistory(createEditor())))
      ),
    []
  );

  const tribeID = query.tribeID as string;
  const roomID = query.viewID as string;

  const tribeRooms = useTribeRooms(tribeID);
  const roomMembers = useRoomMembers(roomID);
  const roomMembersList = useMemo(
    () =>
      getMentionsArrayFromCacheForUI(roomMembers)
        .filter(({ label }) => {
          return search
            ? label.toLowerCase().startsWith(search.toLowerCase())
            : true;
        })
        .map(({ id, avatar, label }) => ({
          id,
          avatar,
          label,
          type: MentionType.Member,
        })),
    [roomMembers, search]
  );
  const emojiList = useMemo(() => {
    return matchSorter(Object.values(data.emojis), search, {
      keys: ['keywords', 'name'],
    });
  }, [search]);

  const tribeRoomsList = useMemo(
    () =>
      tribeRooms
        .filter(({ name }) => {
          return name.toLowerCase().startsWith(search.toLowerCase());
        })
        .map(({ id, name }) => ({
          id,
          label: name,
        })),
    [tribeRooms, search]
  );

  //----------------------------------------------------------------------------------------------------------------
  const { me } = useAuth();
  const passport = usePassport();

  //----------------------------------------------------------------------------------------------------------------
  const renderElement = useCallback((props) => <Element {...props} />, []);

  //----------------------------------------------------------------------------------------------------------------
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const text = serialize(value);
      if (!text?.trim()) return;

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

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();

            if (floatMenu === FloatMenu.Members) {
              const prevIndex =
                index >= roomMembersList.length - 1 ? 0 : index + 1;
              setIndex(prevIndex);
            } else if (floatMenu === FloatMenu.Channels) {
              const prevIndex =
                index >= tribeRoomsList.length - 1 ? 0 : index + 1;
              setIndex(prevIndex);
            } else if (floatMenu === FloatMenu.Emoji) {
              const prevIndex = index >= emojiList.length - 1 ? 0 : index + 1;
              setIndex(prevIndex);
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (floatMenu === FloatMenu.Members) {
              const nextIndex =
                index <= 0 ? roomMembersList.length - 1 : index - 1;
              setIndex(nextIndex);
            } else if (floatMenu === FloatMenu.Channels) {
              const nextIndex =
                index <= 0 ? tribeRoomsList.length - 1 : index - 1;
              setIndex(nextIndex);
            } else if (floatMenu === FloatMenu.Emoji) {
              const nextIndex = index <= 0 ? emojiList.length - 1 : index - 1;
              setIndex(nextIndex);
            }

            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);

            if (floatMenu === FloatMenu.Members) {
              insertUserMention(editor, roomMembersList[index]);
            } else if (floatMenu === FloatMenu.Channels) {
              insertRoomMention(editor, tribeRoomsList[index]);
            } else if (floatMenu === FloatMenu.Emoji) {
              insertEmoji(editor, { native: emojiList[index].skins[0].native });
            }

            setFloatMenu(null);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();

            setFloatMenu(null);
            setTarget(null);
            break;
        }
      }

      if (event.key === 'Enter' && !event.shiftKey && !target) {
        handleSubmit(event);
      }
    },
    [
      target,
      floatMenu,
      editor,
      index,
      roomMembersList,
      tribeRoomsList,
      emojiList,
      handleSubmit,
    ]
  );

  //----------------------------------------------------------------------------------------------------------------
  const renderFloatMenu = () => {
    switch (floatMenu) {
      case FloatMenu.Channels: {
        if (target && tribeRoomsList.length > 0) {
          return (
            <div
              className="bg-gray-800 rounded-md p-3 z-10 mb-1 max-h-96 overflow-auto absolute left-0 w-full"
              style={{ bottom: '6.6rem' }}
            >
              <h3 className="text-sm uppercase text-gray-200">Tribe Rooms</h3>
              {tribeRoomsList.map(({ id, label }, channelIndex) => (
                <>
                  <div
                    key={id}
                    className={`${
                      channelIndex === index ? 'bg-gray-900' : ''
                    } mt-3 py-2 px-3 rounded-md cursor-pointer`}
                    onClick={() => {
                      setIndex(channelIndex);
                      Transforms.select(editor, target);
                      insertRoomMention(editor, tribeRoomsList[index]);

                      setFloatMenu(null);
                      setTarget(null);
                    }}
                    onMouseEnter={() => {
                      setIndex(channelIndex);
                    }}
                  >
                    <div className="flex items-center gap-2">{label}</div>
                  </div>
                </>
              ))}
              <div className="w-full divide-solid " />
            </div>
          );
        }
      }

      case FloatMenu.Emoji: {
        if (target && emojiList.length > 0) {
          return (
            <div
              className="bg-gray-800 rounded-md p-3 z-10 mb-1 max-h-96 overflow-auto absolute left-0 w-full"
              style={{ bottom: '6.6rem' }}
            >
              <h3 className="text-sm uppercase text-gray-200">Emojies</h3>
              {emojiList.map(({ id, skins, name }, emojiIndex) => (
                <>
                  <div
                    key={id}
                    className={`${
                      emojiIndex === index ? 'bg-gray-900' : ''
                    } mt-3 py-2 px-3 rounded-md cursor-pointer`}
                    onClick={() => {
                      setIndex(emojiIndex);
                      Transforms.select(editor, target);
                      insertEmoji(editor, { native: '' });

                      setFloatMenu(null);
                      setTarget(null);
                    }}
                    onMouseEnter={() => {
                      setIndex(emojiIndex);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="emoji"
                        role="img"
                        aria-label={name ? name : ''}
                        aria-hidden={name ? 'false' : 'true'}
                      >
                        {skins[0].native}
                      </span>
                      {id}
                    </div>
                  </div>
                </>
              ))}
              <div className="w-full divide-solid " />
            </div>
          );
        }
      }

      case FloatMenu.Members: {
        if (target && roomMembersList.length > 0) {
          return (
            <div
              className="bg-gray-800 rounded-md p-3 z-10 mb-1 max-h-96 overflow-auto absolute left-0 w-full"
              style={{ bottom: '6.6rem' }}
            >
              <h3 className="text-sm uppercase text-gray-200">Members</h3>
              {roomMembersList.map(({ id, avatar, label }, mentionIndex) => (
                <>
                  <div
                    key={id}
                    className={`${
                      mentionIndex === index ? 'bg-gray-900' : ''
                    } mt-3 py-2 px-3 rounded-md cursor-pointer`}
                    onClick={() => {
                      setIndex(mentionIndex);
                      Transforms.select(editor, target);
                      insertUserMention(editor, roomMembersList[index]);

                      setFloatMenu(null);
                      setTarget(null);
                    }}
                    onMouseEnter={() => {
                      setIndex(mentionIndex);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {avatar && (
                        <img
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          src={avatar}
                          alt={label}
                        />
                      )}
                      {!avatar && label && (
                        <div className="bg-sapien-neutral-200 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center">
                          {label[0].toUpperCase()}
                        </div>
                      )}
                      {label}
                    </div>
                  </div>
                </>
              ))}
              <div className="w-full divide-solid " />
            </div>
          );
        }
      }
    }
  };

  return (
    <>
      <div
        className="flex items-center w-full bg-sapien-neutral-600 shadow px-6 py-6 relative cursor-default"
        style={{ borderRadius: '0.75rem 0.75rem 0 0' }}
      >
        {renderFloatMenu()}

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
                  const beforeMatchAt =
                    beforeText && beforeText.match(/^@(\w+)$/);
                  const beforeMatchHash =
                    beforeText && beforeText.match(/^#(\w+)$/);
                  const after = Editor.after(editor, start);
                  const afterRange = Editor.range(editor, start, after);
                  const afterText = Editor.string(editor, afterRange);
                  const afterMatch = afterText.match(/^(\s|$)/);

                  if (beforeText?.startsWith(':') && beforeText?.length >= 2) {
                    setTarget(beforeRange);
                    setSearch(beforeText.replace(':', ''));
                    setIndex(0);

                    setFloatMenu(FloatMenu.Emoji);
                    return;
                  } else {
                    if (beforeMatchAt && afterMatch) {
                      setTarget(beforeRange);
                      setSearch(beforeMatchAt[1]);
                      setIndex(0);

                      setFloatMenu(FloatMenu.Members);
                      return;
                    }

                    if (beforeMatchHash && afterMatch) {
                      setTarget(beforeRange);
                      setSearch(beforeMatchHash[1]);
                      setIndex(0);

                      setFloatMenu(FloatMenu.Channels);
                      return;
                    }
                  }
                }

                setFloatMenu(null);
                setTarget(null);
              }}
            >
              <Editable
                renderElement={renderElement}
                onKeyDown={onKeyDown}
                placeholder={`Leave a message in ${name}`}
                className="max-w-250 w-full py-2 break-all"
                style={{ cursor: 'text' }}
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
