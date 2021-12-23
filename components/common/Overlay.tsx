import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { Transition } from '@headlessui/react';
import { tw } from 'twind';

interface props {
  children: React.ReactElement;
  onClose: () => void;
  show: boolean;
  actionIcon: React.ReactElement;
}

const Overlay = ({ actionIcon, children, show, onClose }: props) => (
  <>
    {ReactDOM.createPortal(
      <Transition
        as={Fragment}
        show={show}
        enter={tw`transition ease-out duration-100`}
        enterFrom={tw`transform opacity-0 scale-95`}
        enterTo={tw`transform opacity-100 scale-100`}
        leave={tw`transition ease-in duration-75`}
        leaveFrom={tw`"transform opacity-100 scale-100`}
        leaveTo={tw`"transform opacity-0 scale-95`}
      >
        <div className={tw`absolute inset-0 bg-white overflow-auto`}>
          <div className={tw`max-w-5xl w-full mx-auto relative`}>
            <button
              type="button"
              onClick={() => onClose()}
              className={tw`inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 absolute top-10 -right-10`}
            >
              {actionIcon}
            </button>
            {children}
          </div>
        </div>
      </Transition>,
      document.body
    )}
  </>
);

export default Overlay;
