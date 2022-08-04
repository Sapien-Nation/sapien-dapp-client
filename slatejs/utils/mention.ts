import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

// constants
import { MentionType, CustomNode } from '../constants';

export const insertRoomMention = (editor, room) => {
  const mention = {
    type: CustomNode.RoomMention,
    room,
    children: [{ text: `<#${room.id}> ` }],
  };

  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
  ReactEditor.focus(editor);
};

export const insertUserMention = (editor, member) => {
  const mention = {
    type: CustomNode.UserMention,
    member,
    children: [{ text: `<@${member.id}> ` }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
  ReactEditor.focus(editor);
};

export const withRoomMentions = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === CustomNode.RoomMention ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === CustomNode.RoomMention ? true : isVoid(element);
  };

  return editor;
};

export const withUserMentions = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === CustomNode.UserMention ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === CustomNode.UserMention ? true : isVoid(element);
  };

  return editor;
};

export const isNodeUserMention = (node: string) =>
  node.charAt(0) === '<' &&
  node.charAt(1) === '@' &&
  node.charAt(node.length - 1) === '>';

export const isNodeRoomMention = (node: string) =>
  node.charAt(0) === '<' &&
  node.charAt(1) === '#' &&
  node.charAt(node.length - 1) === '>';

export const getUserIDFromNode = (node: string) =>
  node.replace('<@', '').replace('>', '');

export const getRoomlIDFromNode = (node: string) =>
  node.replace('<#', '').replace('>', '');

export const getMentionsArrayFromCacheForOptimistic = (users, body) =>
  body
    .split(' ')
    .map((node) => {
      if (isNodeUserMention(node)) {
        const userID = getUserIDFromNode(node);
        if (userID === '@everyone') {
          const user = users.find(({ id }) => id === userID);

          return user;
        } else {
          return userID;
        }
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
