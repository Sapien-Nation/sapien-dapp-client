import { useSelected, useFocused } from 'slate-react';

const Mention = ({ attributes, children, element }) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <span
      {...attributes}
      contentEditable={false}
      className={`${
        selected && focused ? 'shadow-md' : 'none'
      } p-1 mx-1 align-baseline inline-block rounded bg-gray-700 text-gray-300 text-xs`}
    >
      @{element.member.label}
      {children}
    </span>
  );
};

export default Mention;
