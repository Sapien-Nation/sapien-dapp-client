interface Props {
  animate?: boolean;
  count: number;
  showBorder?: boolean;
}

const RedDot = ({ animate = false, count, showBorder = false }: Props) => {
  if (!count || count < 0 || isNaN(count)) return null;

  return (
    <div className="relative flex items-center">
      {animate === true && (
        <span className="absolute animate-ping inline-flex rounded-full bg-red-400 opacity-75 h-2 w-2 right-0 bottom-2.5" />
      )}
      <div
        className={`flex justify-center items-center bg-sapien-red-700 text-white text-[10px] font-bold p-[3px] ${
          showBorder
            ? 'h-5 min-w-[20px] border-[3px] border-sapien-neutral-900'
            : 'h-4 min-w-[16px]'
        }`}
        style={{ borderRadius: '10px' }}
      >
        {count}
      </div>
    </div>
  );
};

export default RedDot;
