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
        } p-1 mx-1 align-baseline inline-block rounded bg-sapien text-white text-extrabold text-xs`}
      >
        @{element.member.label}
        {children}
      </span>{' '}
    </>
  );
};

export default UserMention;
