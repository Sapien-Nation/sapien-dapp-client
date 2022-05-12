import { Transforms } from 'slate';

// constants
import { MentionType } from '../constants';

export const insertMention = (editor, member) => {
  const mention = {
    type: 'mention',
    member,
    children: [{ text: `<@${member.id}>` }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

export const withMentions = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  return editor;
};

export const getMentionsArrayFromCacheForOptimistic = (users, body) => {
  console.log(users);
  console.log(body);
  return users;
};

export const getMentionsArrayFromCacheForUI = (users) =>
  users.map(({ id, avatar, username }) => ({
    id,
    avatar,
    label: username,
    type: MentionType.Member,
  }));
