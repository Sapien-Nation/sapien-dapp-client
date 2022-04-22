import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const { push, reload } = useRouter();

  useEffect(() => {
    const error = new Error(message);
    Sentry.captureException(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-full min-w-full flex flex-col">
      <div className="rounded-md shadow-2xl bg-gray-800 w-full h-full items-center flex justify-center flex-col sm:px-0 px-4 flex-1 py-8">
        <img
          className="w-24 mx-auto mb-8 rounded-r-lg"
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
          <div className="py-6 bottom-0 flex gap-4 justify-center">
            <button
              onClick={() => {
                push('/');
                setTimeout(() => {
                  reload();
                }, 10);
              }}
              className="mt-4 inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Go Home
            </button>

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
    </div>
  );
};

export default ErrorView;
