import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

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
      <Link href={`/tribes/${tribe.id}/home`} key={tribe.id}>
        <a
          className={`group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 bg-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
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
            className="h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500"
            alt={''}
            src={
              tribe.avatar ||
              'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png'
            }
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png';
            }}
          />
          <span className="sr-only">Go to {tribe.name}</span>
        </a>
      </Link>

      <Tooltip ref={tooltipRef} text={tribe.name} />
    </>
  );
}

export default TribeBarItem;
