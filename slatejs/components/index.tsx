// components
import RoomMention from './RoomMention';
import UserMention from './UserMention';

// constants
import { CustomNode } from '../constants';

export const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case CustomNode.UserMention:
      return <UserMention {...props} />;
    case CustomNode.RoomMention:
      return <RoomMention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
