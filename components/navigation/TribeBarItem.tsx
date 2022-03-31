import _random from 'lodash/random';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect, useState, useRef } from 'react';

// components
import { Tooltip } from 'components/common';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribe: ProfileTribe;
}

function TribeBarItem({ tribe }: Props) {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const { query } = useRouter();
  const { tribeID } = query;

  const tooltipRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.addEventListener('click', handleClick);
    };
  });

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setShowContextMenu(true);
  }, []);

  const handleClick = useCallback(() => {
    showContextMenu && setShowContextMenu(false);
  }, [showContextMenu]);

  return (
    <div className="relative">
      <Link href={`/tribes/${tribe.id}/home`} key={tribe.id}>
        <a
          className={`group p-0.5 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 bg-gray-700 hover:bg-gray-50 hover:text-gray-900 ${
            tribeID === tribe.id && 'bg-gray-50'
          }`}
          onClick={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              handleContextMenu(event);
            }
          }}
          onContextMenu={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              handleContextMenu(event);
            }
          }}
          ref={tooltipRef.current?.setTriggerRef}
        >
          {tribe.avatar ? (
            <img
              className="h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500"
              alt={''}
              src={tribe.avatar}
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  'https://dutuyaq1w3dqh.cloudfront.net/thumbnails/tribes/avatar/sapien_logo-40x40.png';
              }}
            />
          ) : (
            <div className="h-12 w-12 p-1 rounded-xl font-extrabold text-black group-hover:text-gray-500 flex items-center justify-center">
              {tribe.name[0].toUpperCase()}
            </div>
          )}
          <span className="sr-only">Go to {tribe.name}</span>
        </a>
      </Link>

      <Tooltip ref={tooltipRef} text={tribe.name} />
      {showContextMenu && (
        <div className="absolute w-40 bottom-1 left-14 z-10 origin-top-right bg-sapien-neutral-600 divide-y divide-gray-100 rounded-md shadow-lg ring-1 p-2 ring-black ring-opacity-5 focus:outline-none">
          <div className="h-full">
            <div className="flex items-center w-64">{tribe.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TribeBarItem;
