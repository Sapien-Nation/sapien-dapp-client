import { useState } from 'react';
import {
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import { useSWRConfig } from 'swr';
import Linkify from 'linkify-react';

// api
import { deleteChannel } from 'api/channel';

// constants
import { ToastType } from 'constants/toast';

// components
import { EditChannelDialog } from './dialogs';

// hooks
import { useToast } from 'context/toast';
import { useChannelPermissions } from 'hooks/channel';

// types
import type { Channel } from 'tools/types/channel';
import type { ProfileTribe } from 'tools/types/tribe';

// utils
import { isSameOriginURL } from 'utils/url';

interface Props {
  canPost: boolean;
  channel: Channel;
  showMembers: () => void;
  showEditor: () => void;
}

enum Dialog {
  Edit,
}

const ChannelHeader = ({
  canPost,
  channel,
  showMembers,
  showEditor,
}: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();

  const [canEdit, canDelete] = useChannelPermissions(channel.id, [
    'canEdit',
    'canDelete',
  ]);
  const [_, copyToClipboard] = useCopyToClipboard();

  const channelID = query.viewID as string;
  const tribeID = query.tribeID as string;

  const handleCopyToClipboard = () => {
    copyToClipboard(
      `${window?.location.origin}/tribes/${tribeID}/${channelID}`
    );
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

  const handleDeleteChannel = async () => {
    try {
      await deleteChannel(channel.id);

      push(`/tribes/${tribeID}/home`);

      mutate(
        '/core-api/user/tribes',
        (tribes: Array<ProfileTribe>) =>
          tribes.map((tribe) => ({
            ...tribe,
            channels: tribe.channels.filter(
              ({ id: channelID }) => channelID !== channel.id
            ),
          })),
        false
      );
    } catch (err) {
      toast({ message: err });
    }
  };

  return (
    <>
      <div className="bg-sapien-neutral-600 p-3 rounded-xl">
        {channel.cover ? (
          <div className="shadow-md rounded-lg relative w-full h-56">
            <img
              alt={channel.name}
              src={channel.cover}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-r bg-sapien-neutral-200 min-h-250 shadow-md rounded-lg relative flex justify-center items-center" />
        )}
        <div className="flex flex-col md:flex-row sm:mx-8">
          <div className="flex-shrink-0">
            {channel.avatar ? (
              <img
                className="w-40 h-40 mr-auto ml-auto md:mr-0 -mt-16 rounded-xl object-cover relative"
                src={channel.avatar}
                alt=""
              />
            ) : (
              <div className="w-40 h-40 mr-auto ml-auto md:mr-0 -mt-16 rounded-xl bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-bold text-xl relative">
                {channel.name[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-center mt-3 items-center sm:justify-between w-full gap-2">
            <div className="flex flex-col md:ml-7">
              <h1 className="text-xl font-semibold">{channel.name}</h1>

              <h2 className="text-gray-500 mb-4 sm:mb-0">
                <button onClick={showMembers} className="hover:text-white">
                  {channel.membersCount} members
                </button>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {canPost === true && (
                <button
                  onClick={showEditor}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-md border-0 bg-primary hover:bg-sapien-80 focus:outline-none font-semibold"
                >
                  Write an Article
                </button>
              )}
              <div className="flex items-center">
                <button
                  onClick={handleCopyToClipboard}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary hover:bg-sapien-80 focus:outline-none font-semibold"
                >
                  Share
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border-l bg-primary hover:bg-sapien-80 font-medium focus:outline-none"
                >
                  <DocumentDuplicateIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-8 mx-0 md:mx-8">
          <Linkify
            tagName="p"
            options={{
              attributes: {
                onClick: (event) => {
                  const url = isSameOriginURL(event.target.href);
                  if (url) {
                    event.preventDefault();
                    event.stopPropagation();

                    push(url.pathname);
                  }
                },
              },
              className: { url: 'underline text-blue-500' },
              target: (url) => {
                if (isSameOriginURL(url)) return '_parent';

                return '_target';
              },
            }}
          >
            <p className="text-gray-300 whitespace-pre-line line-clamp-5 flex-1">
              {channel.description}
            </p>
          </Linkify>
          <div className="flex justify-end items-center gap-4 text-xs text-gray-400">
            {canEdit && (
              <button onClick={() => setDialog(Dialog.Edit)}>
                <PencilIcon className="w-5 " aria-hidden="true" />
              </button>
            )}
            {canDelete && (
              <div className="relative">
                <Menu as="div">
                  <Menu.Button>
                    <DotsHorizontalIcon className="w-5" />
                  </Menu.Button>
                  <Transition>
                    <Menu.Items className="absolute right-0 w-56 bg-sapien-neutral-900 rounded-md p-2 hover:bg-gray-800 z-10">
                      <Menu.Item>
                        <button
                          className="w-full text-left text-sm text-white"
                          onClick={handleDeleteChannel}
                        >
                          Delete Channel
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {dialog === Dialog.Edit && (
        <EditChannelDialog channel={channel} onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default ChannelHeader;
