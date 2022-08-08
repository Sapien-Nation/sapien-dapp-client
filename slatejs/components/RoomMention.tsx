import { useSelected, useFocused } from 'slate-react';

// helpers
import { TAG_CLASS } from 'components/tribe/views/rooms/helpers';

const RoomMention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <span
      {...attributes}
      contentEditable={false}
      className={`${selected && focused ? 'shadow-md' : 'none'} ${TAG_CLASS}`}
      style={{ marginRight: '2px' }}
    >
      # {element.room.label} {children}
    </span>
  );
};

export default RoomMention;
