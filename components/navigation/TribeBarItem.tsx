import { ClipboardCopyIcon } from '@heroicons/react/solid';
import * as Sentry from '@sentry/nextjs';
import _random from 'lodash/random';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useSWRConfig } from 'swr';

// api
import { leaveTribe } from 'api/tribe';

// components
import { Query, Tooltip } from 'components/common';
import EditTribeDialog from 'components/tribe/dialogs/EditTribeDialog';

// constants
import { ToastType } from 'constants/toast';

// hooks
import { useToast } from 'context/toast';
import { useMainTribe, useTribePermission } from 'hooks/tribe';

// types
import type { MainFeedTribe, ProfileTribe } from 'tools/types/tribe';

interface Props {
  isContextMenuOpen: any;
  tribe: ProfileTribe;
  onRightClick: (tribe: ProfileTribe) => void;
  handleMobileMenu: () => void;
}

enum Dialog {
  EditTribe,
}

function TribeBarItem({
  isContextMenuOpen,
  tribe,
  onRightClick,
  handleMobileMenu,
}: Props) {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const { tribeID } = query;

  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const [canLeave, canEdit] = useTribePermission(tribe.id, [
    'canLeave',
    'canEdit',
  ]);
  const { redirectToMainTribeChannel } = useMainTribe();

  const [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${tribe.id}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

  const handleLeaveTribe = async () => {
    const isLeavingTheCurrentTribe = tribeID === tribe.id;
    try {
      if (isLeavingTheCurrentTribe === false) {
        mutate(
          '/core-api/profile/tribes',
          (tribes: Array<ProfileTribe>) =>
            tribes.filter((tribeCache) => tribeCache.id !== tribe.id),
          false
        );
      }

      if (isLeavingTheCurrentTribe === true) {
        redirectToMainTribeChannel();
      }

      await leaveTribe(tribeID as string);

      if (isLeavingTheCurrentTribe === true) {
        mutate(
          '/core-api/profile/tribes',
          (tribes: Array<ProfileTribe>) =>
            tribes.filter((tribeCache) => tribeCache.id !== tribe.id),
          false
        );
      }
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };
  const toast = useToast();

  const tooltipRef = useRef(null);

  return (
    <>
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
                    top: event.clientY,
                  });
                  onRightClick(tribe);
                }
              }
              handleMobileMenu();
            }}
            onContextMenu={(event) => {
              if (event.type === 'contextmenu') {
                event.preventDefault();
                if (tribe.isMain === false) {
                  setContextMenuPosition({
                    left: event.clientX,
                    top: event.clientY,
                  });
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
              <div className="h-12 w-12 p-1 rounded-xl font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
                {tribe.name[0].toUpperCase()}
              </div>
            )}
            <span className="sr-only">Go to {tribe.name}</span>
          </a>
        </Link>

        {isContextMenuOpen?.id === tribe.id && (
          <div
            style={{
              left: contextMenuPosition.left,
              top: contextMenuPosition.top,
            }}
            className="fixed max-h-max w-64 bottom-1 z-50 py-2 bg-black p-2 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none text-white"
          >
            <div
              onClick={handleCopyToClipboard}
              className="text-sm cursor-pointer hover:bg-sapien-neutral-600 text-white p-2 rounded flex justify-between"
            >
              Invite People{' '}
              <ClipboardCopyIcon className="aria-hidden w-5 h-5" />
            </div>
            {canLeave && (
              <>
                <div className="w-full border-t border-gray-600" />
                <div
                  onClick={handleLeaveTribe}
                  className="text-sm cursor-pointer hover:bg-sapien-neutral-600 text-white p-2 rounded flex justify-between"
                >
                  Leave Tribe
                </div>
              </>
            )}
            {canEdit && (
              <>
                <div className="w-full border-t border-gray-600" />
                <div
                  onClick={() => {
                    setDialog(Dialog.EditTribe);
                  }}
                  className="text-sm cursor-pointer hover:bg-sapien-neutral-600 text-white p-2 rounded flex justify-between"
                >
                  Edit Tribe
                </div>
              </>
            )}
          </div>
        )}

        <Tooltip
          ref={tooltipRef}
          text={tribe.name}
          forceHidden={Boolean(isContextMenuOpen)}
        />
      </div>

      {dialog === Dialog.EditTribe && (
        <Query api={`/core-api/tribe/${tribe.id}`} loader={null}>
          {(tribeInfo: MainFeedTribe) => (
            <EditTribeDialog
              tribe={tribeInfo}
              onClose={() => setDialog(null)}
            />
          )}
        </Query>
      )}
    </>
  );
}

export default TribeBarItem;
