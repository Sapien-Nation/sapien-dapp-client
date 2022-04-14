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
  onRetry = () => window.location.reload(),
}: Props) => {
  useEffect(() => {
    const error = new Error(message);
    Sentry.captureException(error);
  }, []);

  return (
    <div className="items-left min-h-full min-w-full sm:p-24">
      <div className="rounded-md shadow-2xl bg-gray-800 w-full h-full items-center flex justify-center flex-col sm:px-0 px-4">
        <img
          className="pr-1 w-24 mx-auto pb-4 rounded-r-lg"
          src="https://cdn.discordapp.com/attachments/723232557797212261/964188953781633095/Default-PFP-No-BG.png"
          alt="sapien"
        />
        <div className="grid gap-6 max-w-lg">
          <p className="text-lg">
            <span className="font-extrabold">{code}.</span> This is the code of
            an error
          </p>
          <h2 className="text-white text-5x font-semibold subpixel-antialiased">
            Sapiens... &quot;🍌&quot; we have a problem, but dont worry our
            engineering team has been already notified and will be working on
            fixing this PRONTO
          </h2>
        </div>
        <span className="text-gray-400 text-md font-semibold py-8 sr-only">
          {message}
        </span>
        <div className="py-6 bottom-0 flex gap-4">
          <Link href="/">
            <a className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Go Home
            </a>
          </Link>

          <a
            target="_blank"
            rel="noreferrer"
            href="mailto:passports@sapien.network"
            className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Contact Support
          </a>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorView;
