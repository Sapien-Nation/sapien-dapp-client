interface Props {
  animate?: boolean;
  count: number;
}

const RedDot = ({ animate = false, count }: Props) => {
  if (!count) return null;

  return (
    <span className="h-5 w-5 ml-2">
      {animate === true && (
        <span className="absolute animate-ping inline-flex rounded-full bg-red-400 opacity-75 h-5 w-5" />
      )}
      <span className="rounded-full bg-red-500 text-white text-xs font-extrabold flex justify-center items-center h-5 w-5">
        {count >= 100 ? '99+' : count}
      </span>
    </span>
  );
};

export default RedDot;
