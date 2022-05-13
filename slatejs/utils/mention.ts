import { Transforms } from 'slate';

// constants
import { MentionType } from '../constants';

export const insertMention = (editor, member) => {
  const mention = {
    type: 'mention',
    member,
    children: [{ text: `<@${member.id}> ` }],
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

export const isNodeMention = (node: string) =>
  node.charAt(0) === '<' &&
  node.charAt(1) === '@' &&
  node.charAt(node.length - 1) === '>';

export const getUserIDFromNode = (node: string) =>
  node.replace('<@', '').replace('>', '');

export const getMentionsArrayFromCacheForOptimistic = (users, body) =>
  body
    .split(' ')
    .map((node) => {
      if (isNodeMention(node)) {
        const userID = getUserIDFromNode(node);
        const user = users.find(({ id }) => id === userID);

        return user;
      }

      return false;
    })
    .filter(Boolean);

export const getMentionsArrayFromCacheForUI = (users) =>
  users.map(({ id, avatar, username }) => ({
    id,
    avatar,
    label: username,
    type: MentionType.Member,
  }));
