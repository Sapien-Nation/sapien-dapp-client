interface Props {
  animate?: boolean;
  count: number;
}

const RedDot = ({ animate = false, count }: Props) => {
  if (!count) return null;

  return (
    <span className="relative flex items-center">
      {animate === true && (
        <span className="absolute animate-ping inline-flex rounded-full bg-red-400 opacity-75 h-2 w-2 right-0 bottom-2.5" />
      )}
      <span
        className="rounded- bg-sapien-red-700 text-white text-10px font-bold flex justify-center items-center h-4 min-w-16px px-1"
        style={{ borderRadius: '100px' }}
      >
        {count}
      </span>
    </span>
  );
};

export default RedDot;
