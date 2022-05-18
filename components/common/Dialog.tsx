import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

export interface Props {
  actions?: React.ReactElement;
  bgOpacity?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  children?: React.ReactElement | null;
  isFetching?: boolean;
  form?: string;
  onClose?: () => void;
  onCancel?: (data?: unknown) => void;
  onConfirm?: (event?: unknown) => void;
  showCancel?: boolean;
  showConfirm?: boolean;
  title?: string;
  show: boolean;
}

const Dialog = ({
  bgOpacity = 'bg-opacity-75',
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isFetching = false,
  form = '',
  show,
  showCancel = true,
  showConfirm = true,
  onClose,
  onCancel = onClose || (() => null),
  onConfirm,
  actions = (
    <>
      {showConfirm && (
        <button
          type={form ? 'submit' : 'button'}
          className={
            isFetching
              ? 'cursor-not-allowed disabled:opacity-75 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm'
              : 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-primary hover:bg-sapien-80 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm'
          }
          onClick={onConfirm}
          disabled={isFetching}
          form={form}
        >
          {confirmLabel}
        </button>
      )}
      {showCancel && (
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border-0 px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sapien-red-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onCancel}
        >
          {cancelLabel}
        </button>
      )}
    </>
  ),
  children = null,
  title,
}: Props) => {
  const showActionsSection = showCancel === true || showConfirm === true;
  return (
    <Transition.Root
      enter="transition duration-100 ease-out"
      appear
      show={show}
      as={Fragment}
    >
      <HeadlessDialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
        aria-label={title}
      >
        <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay
              className={`fixed inset-0 bg-gray-700 ${bgOpacity} transition-opacity`}
            />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full align-bottom rounded-lg pt-5 text-left overflow-hidden bg-gray-900 shadow-neutral-800 shadow transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:min-w-570">
              <div className="px-4 sm:p-8 pb-4">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onCancel}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 sm:mt-5">
                  <HeadlessDialog.Title
                    as="h2"
                    className="text-xl leading-6 font-bold text-center"
                  >
                    {title}
                  </HeadlessDialog.Title>
                </div>
                <div>{children}</div>
              </div>
              {showActionsSection && (
                <div className="py-3 px-4 sm:px-8 mt-4 sm:flex sm:flex-row-reverse border-t border-gray-800 shadow-inner shadow-sapien-neutral-600">
                  {actions}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
};

export default Dialog;
