import { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/outline';
import { useCopyToClipboard } from 'react-use';
import { useRouter } from 'next/router';
import Linkify from 'linkify-react';

// components
import { EditTribeDialog } from 'components/tribe/dialogs';

// constants
import { ToastType } from 'constants/toast';

// hooks
import { useToast } from 'context/toast';

// types
import type { MainFeedTribe } from 'tools/types/tribe';
import { useTribePermission } from 'hooks/tribe';

// utils
import { isSameOriginURL } from 'utils/url';

interface Props {
  tribe: MainFeedTribe;
}

enum Dialog {
  EditTribe,
}

const MainChannelHeader = ({ tribe }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);

  const toast = useToast();
  const { push, query } = useRouter();
  const [_, copyToClipboard] = useCopyToClipboard();

  const { tribeID } = query;

  const [canEdit] = useTribePermission(tribe.id, ['canEdit']);

  const handleCopyToClipboard = () => {
    copyToClipboard(`${window?.location.origin}/join/${tribeID}`);
    toast({
      message: 'Copied to clipboard',
      type: ToastType.Success,
    });
  };

  return (
    <>
      <div className="bg-sapien-neutral-600 p-3 pb-6 rounded-xl mb-4">
        {tribe.cover ? (
          <div className="shadow-md rounded-lg relative w-full h-56">
            {/* @ts-ignore */}
            <img
              alt={tribe.name}
              src={tribe.cover}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-r bg-sapien-neutral-200 min-h-250 shadow-md rounded-lg relative flex justify-center items-center" />
        )}
        <div className="flex flex-col md:flex-row">
          <div className="relative">
            {tribe.avatar ? (
              <img
                className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0 object-cover"
                src={tribe.avatar}
                alt=""
              />
            ) : (
              <div className="w-40 h-40 mr-auto ml-auto sm:mr-0 sm:ml-8 -mt-16 rounded-xl flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-bold text-xl">
                {tribe.name[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center mt-3 items-center sm:justify-between w-full">
            <div className="flex flex-col justify-center sm:ml-12">
              <h1 className="text-xl text-center sm:text-left font-semibold">
                {tribe.name}
              </h1>
              <h2 className="text-gray-500 mb-4 sm:mb-0">
                {tribe.membersCount} members
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center sm:mr-5">
                <button
                  onClick={handleCopyToClipboard}
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 rounded-l-md border-0 bg-primary hover:bg-sapien-80 focus:outline-none font-semibold"
                >
                  Invite
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  type="button"
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border-l bg-primary hover:bg-sapien-80 font-medium focus:outline-none mr-3"
                >
                  <DocumentDuplicateIcon className="w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-8 mx-8">
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
              {tribe.description}
            </p>
          </Linkify>
          <div
            className={`${canEdit ? 'visible' : 'hidden'} flex items-center`}
          >
            <button
              className="border border-gray-400 hover:border-gray-100 rounded-md font-semibold text-xs text-gray-400 p-1 min-w-[70px]"
              onClick={() => setDialog(Dialog.EditTribe)}
            >
              Edit Tribe
            </button>
          </div>
        </div>
      </div>

      {dialog === Dialog.EditTribe && (
        <EditTribeDialog tribe={tribe} onClose={() => setDialog(null)} />
      )}
    </>
  );
};

export default MainChannelHeader;
