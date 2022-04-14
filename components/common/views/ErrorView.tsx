import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

interface Props {
  code?: number;
  message?: string;
  onRetry?: () => void | null;
}

const ErrorView = ({
  code = 500,
  message = 'Looks like something went wrong here!',
  onRetry = () => window.location.reload(),
}: Props) => {
  useEffect(() => {
    const error = new Error(message);
    Sentry.captureException(error);
  }, [message]);

  return (
    <div className="flex justify-center items-center min-h-full min-w-full">
      <div className="rounded-md p-4 text-center">
        <img
          className="pr-1 w-24 mx-auto pb-4"
          src="/images/logooutlined.svg"
          alt="sapien"
        />
        <h1 className="font-extrabold text-5xl mb-1 text-primary-200">
          {code}
        </h1>
        <h2 className="text-white text-xl font-semibold">
          Sapiens.. we have a problem
        </h2>
        <h2 className="text-gray-400 text-md font-semibold mb-3">{message}</h2>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Retry network call
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;
