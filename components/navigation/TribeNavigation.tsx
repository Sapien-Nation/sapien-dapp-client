import { UserGroupIcon, PlusIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

// components
import { CreateRoomDialog } from 'components/tribe/dialogs';

// hooks
import { useTribe } from 'hooks/tribe';

// utils
import { mergeClassNames } from 'utils/styles';

enum Dialog {
  CreateRoom,
}

const TribeNavigation = () => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { asPath, query } = useRouter();
  const { tribeID } = query;

  const { name } = useTribe(tribeID as string);

  return (
    <>
      <div className="w-full">
        <div>
          <nav>
            <ul>
              <li className="px-4 py-4 border-b">
                <span
                  className={mergeClassNames(
                    asPath === `/tribes/${tribeID}/home`
                      ? 'font-extrabold'
                      : '',
                    'relative w-full cursor-pointer tracking-wide items-center uppercase font-medium text(sm gray-500) flex rounded-lg focus:outline-none'
                  )}
                >
                  <UserGroupIcon className="h-5 w-5 mr-4" />
                  {name}
                </span>
              </li>
            </ul>
            <button
              className="px-4 py-2 mt-4 text-base w-full flex justify-between items-center"
              onClick={() => setDialog(Dialog.CreateRoom)}
            >
              ROOMS <PlusIcon className="text-white w-5" />
            </button>
            <ul className="px-4 py-2">
              <li className="text-base">General</li>
            </ul>
          </nav>
        </div>
        {/* Modals */}
        {dialog === Dialog.CreateRoom && (
          <CreateRoomDialog onClose={() => setDialog(null)} />
        )}
      </div>
    </>
  );
};

export default TribeNavigation;
