import ReactDOM from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePopperTooltip } from 'react-popper-tooltip';
import { tw } from 'twind';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribe: ProfileTribe;
  handleClick: (tribe: ProfileTribe) => void;
}

function TribeBarItem({ tribe, handleClick }: Props) {
  const { query } = useRouter();
  const { tribeID } = query;
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip(
      {},
      {
        placement: 'right',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 23],
            },
          },
        ],
      }
    );

  return (
    <>
      <Link href={`/tribes/${tribe.id}/${tribe.mainSquareId}`} key={tribe.id}>
        <a
          className={tw`group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 bg-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
            tribeID === tribe.id && 'bg-gray-50'
          }`}
          onClick={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              handleClick(tribe);
            }
          }}
          onContextMenu={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              handleClick(tribe);
            }
          }}
          ref={setTriggerRef}
        >
          <img
            className={tw`h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500`}
            alt={
              tribe.avatar
                ? `${tribe.name} Avatar image`
                : 'Sapien Tribe Default logo image of human Sapiens'
            }
            src={tribe.avatar || '/images/sapien-tribe.png'}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                '/images/default_temp.jpeg';
            }}
          />
          <span className={tw`sr-only`}>Go to {tribe.name}</span>
        </a>
      </Link>

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
            {tribe.name}
          </div>,
          document.body
        )}
    </>
  );
}

export default TribeBarItem;
