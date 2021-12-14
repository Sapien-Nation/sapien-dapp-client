import { forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import { tw } from 'twind';

interface Props {
  text: string;
}

const Tooltip = forwardRef(({ text }: Props, ref) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip(
      {},
      {
        placement: 'right',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 25],
            },
          },
        ],
      }
    );

  useImperativeHandle(
    ref,
    () => ({
      setTriggerRef,
    }),
    [setTriggerRef]
  );

  return (
    <>
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: tw`relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded`,
            })}
          >
            <div
              className={tw`w-4 h-4 bg-black block -z-10 rotate-45 -left-0.5 top-1/2 transform -translate-y-1/2 absolute`}
            />
            {text}
          </div>,
          document.body
        )}
    </>
  );
});

export default Tooltip;
