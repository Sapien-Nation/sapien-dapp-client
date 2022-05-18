import { useSelected, useFocused } from 'slate-react';

const UserMention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <>
      <span
        {...attributes}
        contentEditable={false}
        className={`${
          selected && focused ? 'shadow-md' : 'none'
        } px-0.5 mx-1 align-baseline inline-block font-semibold rounded-sm bg-sapien text-white text-xs`}
      >
        @{element.member.label}
        {children}
      </span>{' '}
    </>
  );
};

export default UserMention;
