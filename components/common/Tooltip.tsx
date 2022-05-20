import { forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';

// types
import type { PopperOptions } from 'react-popper-tooltip';

interface Props {
  forceHidden?: boolean;
  text: string;
  placement?: string;
  offset?: number;
}

// eslint-disable-next-line react/display-name
const Tooltip = forwardRef(
  (
    { forceHidden = false, text, placement = 'right', offset = 25 }: Props,
    ref
  ) => {
    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
      usePopperTooltip(
        {},
        {
          // @ts-ignore
          placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, offset],
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
          forceHidden == false &&
          ReactDOM.createPortal(
            <div
              ref={setTooltipRef}
              {...getTooltipProps({
                className:
                  'absolute p-2 text-xs leading-none text-white whitespace-no-wrap bg-sapien-neutral-800 shadow-lg rounded z-10',
              })}
            >
              <div className="w-4 h-4 bg-sapien-neutral-800 block -z-10 rotate-45 -left-0.5 top-1/2 transform -translate-y-1/2 absolute" />
              {text}
            </div>,
            document.body
          )}
      </>
    );
  }
);

export default Tooltip;
