import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { tw } from 'twind';

// types
import type { ProfileTribe } from 'tools/types/tribe';
import { Tooltip } from 'components/common';

interface Props {
  tribe: ProfileTribe;
  handleClick: (tribe: ProfileTribe) => void;
}

function TribeBarItem({ tribe, handleClick }: Props) {
  const { query } = useRouter();
  const { tribeID } = query;

  const tooltipRef = useRef(null);

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
          ref={tooltipRef.current?.setTriggerRef}
        >
          <img
            className={tw`h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500`}
            alt={
              tribe.avatar
                ? `${tribe.name} Avatar image`
                : 'Sapien Tribe Default logo image of human Sapiens'
            }
            src={
              tribe.avatar ||
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png'
            }
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                'https://d151dmflpumpzp.cloudfront.net/tribe-images/default_temp.jpeg';
            }}
          />
          <span className={tw`sr-only`}>Go to {tribe.name}</span>
        </a>
      </Link>

      <Tooltip ref={tooltipRef} text={tribe.name} />
    </>
  );
}

export default TribeBarItem;
