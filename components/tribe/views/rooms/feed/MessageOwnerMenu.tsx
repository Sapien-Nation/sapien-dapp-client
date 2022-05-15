import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/solid';

interface Props {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  onMenuItemClick: (type: 'delete' | 'edit') => void;
}

const MessageOwnerMenu = ({
  isFocused,
  setIsFocused,
  onMenuItemClick,
}: Props) => {
  return (
    <Menu
      as="div"
      className={`${
        isFocused ? 'block' : 'hidden'
      } relative leading-[0] group-hover:block -right-4 w-12`}
    >
      <Menu.Button className="inline-flex justify-center w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <DotsVerticalIcon
          onClick={() => {
            setIsFocused(true);
          }}
          className="w-5 text-gray-400"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 w-56 -top-3 origin-top-right bg-black divide-y divide-gray-800 rounded-md shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={
                    active
                      ? 'bg-red-800 text-white group flex rounded items-center w-full px-2 py-2 text-sm'
                      : ' group flex rounded items-center w-full px-2 py-2 text-sm text-red-400'
                  }
                  onClick={() => onMenuItemClick('delete')}
                >
                  <TrashIcon className="w-5 mr-2 text-white" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MessageOwnerMenu;
