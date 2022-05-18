import { useSelected, useFocused } from 'slate-react';

const RoomMention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <>
      <span
        {...attributes}
        contentEditable={false}
        className={`${
          selected && focused ? 'shadow-md' : 'none'
        } p-0.5 mx-1 align-baseline inline-block rounded-sm font-semibold bg-sapien underline text-white text-xs`}
      >
        # {element.room.label}
        {children}
      </span>{' '}
    </>
  );
};

export default RoomMention;
