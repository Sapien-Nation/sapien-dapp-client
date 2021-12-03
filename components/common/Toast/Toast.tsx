import { tw } from 'twind';

// context
import { useToastDispatchContext } from 'context/toast';

// constants
import { ToastType } from 'constants/toast';

interface Props {
  type: ToastType;
  message: string;
  id: string;
}

const Toast = ({ type, message, id }: Props) => {
  const dispatch = useToastDispatchContext();

  const renderToast = () => {
    switch (type) {
      case ToastType.Error:
        return (
          <div className={tw`rounded-md bg-red-50 p-4 m-3`}>
            <div className={tw`flex`}>
              <div className={tw`flex-shrink-0`}>
                <svg
                  className={tw`h-5 w-5 text-red-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={tw`ml-3`}>
                <p className={tw`text-sm font-medium text-red-800`}>
                  {message}
                </p>
              </div>
              <div className={tw`ml-auto pl-3`}>
                <div className={tw`-mx-1.5 -my-1.5`}>
                  <button
                    onClick={() => {
                      dispatch({ type: 'DELETE_TOAST', id });
                    }}
                    className={tw`inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-red-600`}
                  >
                    <span className={tw`sr-only`}>Dismiss</span>

                    <svg
                      className={tw`h-5 w-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case ToastType.Success:
        return (
          <div className={tw`rounded-md bg-green-50 p-4 m-3`}>
            <div className={tw`flex`}>
              <div className={tw`flex-shrink-0`}>
                <svg
                  className={tw`h-5 w-5 text-green-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={tw`ml-3`}>
                <p className={tw`text-sm font-medium text-green-800`}>
                  {message}
                </p>
              </div>
              <div className={tw`ml-auto pl-3`}>
                <div className={tw`-mx-1.5 -my-1.5`}>
                  <button
                    onClick={() => {
                      dispatch({ type: 'DELETE_TOAST', id });
                    }}
                    className={tw`inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
                  >
                    <span className={tw`sr-only`}>Dismiss</span>

                    <svg
                      className={tw`h-5 w-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderToast()}</>;
};

export default Toast;
