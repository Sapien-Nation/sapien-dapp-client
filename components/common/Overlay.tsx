import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  blur?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = ({ blur = false, children, isOpen, onClose }: Props) => {
  return (
    <Transition.Root appear={true} show={isOpen} as={Fragment}>
      <div
        className="z-10 fixed inset-0"
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
          <div
            className={`h-full overflow-hidden ${
              blur ? 'backdrop-blur-md bg-black/30' : 'bg-sapien-neutral-800'
            }`}
          >
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default Overlay;
