import { useSelected, useFocused } from 'slate-react';

// helpers
import { TAG_CLASS } from 'components/tribe/views/rooms/helpers';

const UserMention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <span
      {...attributes}
      contentEditable={false}
      className={`${selected && focused ? 'shadow-md' : 'none'} ${TAG_CLASS}`}
      style={{ marginRight: '2px' }}
    >
      @{element.member.label} {children}
    </span>
  );
};

export default UserMention;
