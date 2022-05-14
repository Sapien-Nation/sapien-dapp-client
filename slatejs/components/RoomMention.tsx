import { useSelected, useFocused } from 'slate-react';

const RoomMention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <span
      {...attributes}
      contentEditable={false}
      className={`${
        selected && focused ? 'shadow-md' : 'none'
      } p-1 mx-1 align-baseline inline-block rounde bg-sapien-80 underline text-white text-extrabold text-xs`}
    >
      # {element.room.label}
      {children}
    </span>
  );
};

export default RoomMention;
