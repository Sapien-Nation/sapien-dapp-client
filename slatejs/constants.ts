export enum ElementType {
  Paragraph = 'paragraph',
}

export enum CustomNode {
  RoomMention = 'roomMention',
  UserMention = 'userMention',
}

export const defaultValue = [
  {
    children: [{ text: '' }],
    type: ElementType.Paragraph,
    key: null,
  },
];

export enum MentionType {
  All = 'all',
  Member = 'member',
}
