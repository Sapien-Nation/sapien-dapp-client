import _random from 'lodash/random';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
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
  const { query } = useRouter();
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const { tribeID } = query;

  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${tribe.id}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

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
                setContextMenuPosition({
                  left: event.clientX,
                  top: event.clientY
                });
                onRightClick(tribe);
              }
            }
          }}
          onContextMenu={(event) => {
            if (event.type === 'contextmenu') {
              event.preventDefault();
              if (tribe.isMain === false) {
                setContextMenuPosition({
                  left: event.clientX,
                  top: event.clientY
                })
                onRightClick(tribe);
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

      {isContextMenuOpen?.id === tribe.id && (
        <div style={{left: contextMenuPosition.left, top: contextMenuPosition.top}} className="fixed max-h-max w-40 bottom-1 z-50 bg-black p-2 rounded shadow-lg ring-black ring-opacity-5 focus:outline-none text-gray-400">
          <div
            onClick={handleCopyToClipboard}
            className="text-sm cursor-pointer hover:bg-sapien-neutral-600 text-gray-200 p-2 rounded"
          >
            Invite People
          </div>
        </div>
      )}

      <Tooltip
        ref={tooltipRef}
        text={tribe.name}
        forceHidden={Boolean(isContextMenuOpen)}
      />
    </div>
  );
}

export default TribeBarItem;
