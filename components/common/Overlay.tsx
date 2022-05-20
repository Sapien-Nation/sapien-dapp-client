import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = ({ children, isOpen, onClose }: Props) => {
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
              <div className="w-full h-full bg-white">{children}</div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

export default Overlay;
