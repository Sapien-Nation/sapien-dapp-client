import { useEffect } from 'react';
import Link from 'next/link';

import * as Sentry from '@sentry/nextjs';

interface Props {
  message?: string;
}

const ErrorView = ({
  message = 'Looks like something went wrong here!',
}: Props) => {
  useEffect(() => {
    const error = new Error(message);
    Sentry.captureException(error);
  }, [message]);

  return (
    <div className="rounded-md bg-sapien-red-700/40 p-4 text-center">
      <h2 className="text-white text-lg font-semibold">{message}</h2>
      <Link href="/">
        <a className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Retry
        </a>
      </Link>
    </div>
  );
};

export default ErrorView;
