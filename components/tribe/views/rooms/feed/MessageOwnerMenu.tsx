import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

interface Props {
  onMenuItemClick: (type: 'delete' | 'edit') => void;
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#b91c1c"
        stroke="#b91c1c"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#b91c1c" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#b91c1c" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#ffffff" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="2"
      />
    </svg>
  );
}

const MessageOwnerMenu = ({ onMenuItemClick }: Props) => {
  return (
    <Menu
      as="div"
      className="absolute leading-[0] group-hover:block right-0 w-8 h-8 hidden hover:block"
    >
      <Menu.Button className="inline-flex justify-center w-full text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <DotsVerticalIcon className="w-5 text-gray-400" />
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
        <Menu.Items
          static
          className="absolute z-10 right-0 w-56 -top-3 origin-top-right bg-black divide-y divide-gray-800 rounded-md shadow-lg ring-2 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={
                    active
                      ? 'bg-red-700 text-white group flex rounded items-center w-full px-2 py-2 text-sm'
                      : ' group flex rounded items-center w-full px-2 py-2 text-sm text-white'
                  }
                  onClick={() => onMenuItemClick('delete')}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
            {false && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={
                      active
                        ? 'bg-red-700 text-white group flex rounded items-center w-full px-2 py-2 text-sm'
                        : ' group flex rounded items-center w-full px-2 py-2 text-sm text-white'
                    }
                    onClick={() => onMenuItemClick('edit')}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MessageOwnerMenu;
