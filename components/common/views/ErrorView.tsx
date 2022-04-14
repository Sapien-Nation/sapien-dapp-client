import { useEffect } from 'react';
import Link from 'next/link';

import * as Sentry from '@sentry/nextjs';

interface Props {
  code?: number;
  message?: string;
  onRetry?: () => void | null;
}

const ErrorView = ({
  code = 500,
  message = 'Looks like something went wrong here!',
  onRetry,
}: Props) => {
  useEffect(() => {
    const error = new Error(message);
    Sentry.captureException(error);
  }, [message]);

  return (
    <div className="flex justify-center items-center min-h-full min-w-full">
      <div className="rounded-md p-4 text-center">
        <h2 className="text-white text-xl font-semibold">
          <span className="font-extrabold">{code}</span>: Sapiens.. we have a
          problem
        </h2>
        <h2 className="text-white text-lg font-semibold">{message}</h2>
        {onRetry && (
          <>
            <p>
              Seems like there is a chance to recover from this error? wanna
              try?
            </p>
            <button
              onClick={onRetry}
              className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Retry network call
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorView;
