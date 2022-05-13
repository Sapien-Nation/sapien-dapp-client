interface Props {
  animate?: boolean;
  count: number;
}

const RedDot = ({ animate = false, count }: Props) => {
  if (count === 0) return null;

  return (
    <span className="flex h-5 w-5 ">
      {animate === true && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      )}
      <span className="relative rounded-full h-5 w-5 bg-red-500 text-white text-xs font-extrabold text-center">
        {count >= 100 ? '99+' : count}
      </span>
    </span>
  );
};

export default RedDot;
