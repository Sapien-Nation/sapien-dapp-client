import _random from 'lodash/random';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useCopyToClipboard } from 'react-use';

// components
import { Tooltip } from 'components/common';

// types
import type { ProfileTribe } from 'tools/types/tribe';

// constants
import { ToastType } from 'constants/toast';

// hooks
import { useToast } from 'context/toast';

interface Props {
  isContextMenuOpen: any;
  tribe: ProfileTribe;
  onRightClick: (tribe: ProfileTribe) => void;
}

function TribeBarItem({ isContextMenuOpen, tribe, onRightClick }: Props) {

  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${isContextMenuOpen.id}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };
  const { query } = useRouter();
  const { tribeID } = query;

  const toast = useToast();

  const tooltipRef = useRef(null);

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
              if (tribe.isMain === false) {
                onRightClick(tribe.id);
              }
            }
          }}
          onContextMenu={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              if (tribe.isMain === false) {
                onRightClick(tribe.id);
              }
            }
          }}
          ref={tooltipRef.current?.setTriggerRef}
        >
          {tribe.avatar ? (
            <img
              className="h-12 w-12 p-1 rounded-xl text-gray-400 bg-gray-900 group-hover:text-gray-500"
              alt={''}
              src={tribe.avatar}
            />
          ) : (
            <div className="h-12 w-12 p-1 rounded-xl font-extrabold text-black group-hover:text-gray-500 flex items-center justify-center">
              {tribe.name[0].toUpperCase()}
            </div>
          )}
          <span className="sr-only">Go to {tribe.name}</span>
        </a>
      </Link>

      {isContextMenuOpen && isContextMenuOpen === tribe.id && (
        <div className="absolute h-20 w-40 bottom-1 z-10 top-0 left-14 bg-black rounded-md shadow-lg py-1 px-4 ring-black ring-opacity-5 focus:outline-none text-gray-400">
          <div className="h-full w-full relative justify-around flex flex-col">
            <div
              onClick={handleCopyToClipboard}
              className="text-sm cursor-pointer hover:text-white text-purple-200"
            >
              Invite People
            </div>
          </div>
        </div>
      )}

      <Tooltip
        ref={tooltipRef}
        text={tribe.name}
        forceHidden={isContextMenuOpen}
      />
    </div>
  );
}

export default TribeBarItem;
