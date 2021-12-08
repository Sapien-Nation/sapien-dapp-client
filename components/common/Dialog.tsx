import { Fragment } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { tw } from 'twind';
import { XIcon } from '@heroicons/react/outline';

interface Props {
  actions?: React.ReactElement;
  cancelLabel?: string;
  confirmLabel?: string;
  children?: React.ReactElement | null;
  form?: string;
  onClose?: () => void;
  onCancel?: (data?: unknown) => void;
  onConfirm?: (event?: unknown) => void;
  showCancel?: boolean;
  showConfirm?: boolean;
  title?: string;
}

const Dialog = ({
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  form = '',
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
          className={tw`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      )}
      {showCancel && (
        <button
          type="button"
          className={tw`mt-3 w-full inline-flex justify-center rounded-md border-0 px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
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
  return (
    <Transition.Root show as={Fragment}>
      <HeadlessDialog
        as="div"
        className={tw`fixed z-10 inset-0 overflow-y-auto`}
        onClose={onClose}
      >
        <div
          className={tw`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}
        >
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
              className={tw`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
            />
          </Transition.Child>
          <span
            className={tw`hidden sm:inline-block sm:align-middle sm:h-screen`}
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
            <div
              className={tw`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}
            >
              <div
                className={tw`hidden sm:block absolute top-0 right-0 pt-4 pr-4`}
              >
                <button
                  type="button"
                  className={tw`bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={onCancel}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 sm:mt-5">
                <HeadlessDialog.Title
                  as="h2"
                  className={tw`text-xl leading-6 font-bold text-gray-900`}
                >
                  {title}
                </HeadlessDialog.Title>
              </div>
              <div>{children}</div>
              <div
                className={tw`bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
              >
                {actions}
              </div>
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
};

export default Dialog;
