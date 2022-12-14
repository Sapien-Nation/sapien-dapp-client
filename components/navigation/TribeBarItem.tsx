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
import { Query, RedDot, Tooltip } from 'components/common';
import { EditTribeDialog } from 'components/tribe/dialogs';

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

  const toast = useToast();
  const { query } = useRouter();
  const { mutate } = useSWRConfig();

  const tooltipRef = useRef(null);

  const { tribeID } = query;

  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const [canLeaveTribe, canEditTribe] = useTribePermission(tribe.id, [
    'canLeaveTribe',
    'canEditTribe',
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
          '/core-api/user/tribes',
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
          '/core-api/user/tribes',
          (tribes: Array<ProfileTribe>) =>
            tribes.filter((tribeCache) => tribeCache.id !== tribe.id),
          false
        );
      }
    } catch (err) {
      Sentry.captureMessage(err);
    }
  };

  const unreadMentions = tribe.rooms
    .map(({ unreadMentions }) => unreadMentions)
    .reduce((accumulator, current) => accumulator + current, 0);

  return (
    <>
      <div className="relative">
        <Link href={`/tribes/${tribe.id}/home`} key={tribe.id}>
          <a
            className={`h-12 w-12 group p-1 cursor-pointer rounded-xl flex items-center text-base font-medium text-gray-600 hover:text-gray-900 ${
              tribeID === tribe.id && 'border-white hover:border-white'
            } border-2 border-white/10 hover:border-gray-400`}
            onClick={(event) => {
              if (setContextMenuPosition) {
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
              }

              if (handleMobileMenu) {
                handleMobileMenu();
              }
            }}
            onContextMenu={(event) => {
              if (event.type === 'contextmenu') {
                event.preventDefault();
                if (setContextMenuPosition) {
                  if (tribe.isMain === false) {
                    setContextMenuPosition({
                      left: event.clientX,
                      top: event.clientY,
                    });
                    onRightClick(tribe);
                  }
                }
              }
            }}
            ref={tooltipRef ? tooltipRef.current?.setTriggerRef : null}
          >
            {tribe.avatar ? (
              <img
                className="w-full h-full rounded-lg text-gray-400 bg-gray-900 group-hover:text-gray-500"
                alt={''}
                src={tribe.avatar}
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gray-700 font-bold text-black group-hover:text-gray-500 flex items-center justify-center">
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
            {canLeaveTribe && (
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
            {canEditTribe && (
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
        <div className="absolute -top-1 -right-1">
          <RedDot count={unreadMentions} showBorder />
        </div>
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
