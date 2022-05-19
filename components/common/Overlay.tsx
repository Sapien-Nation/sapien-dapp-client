import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

const Overlay = ({ children, title, onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Transition.Root appear={true} show={isOpen} as={Fragment}>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          afterLeave={() => onClose()}
        >
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-full h-full bg-white">
                <div className="px-4 sm:px-6 py-4 sm:py-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      {title}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close pannel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default Overlay;
