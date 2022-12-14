import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  code?: number;
  message?: string;
  subtitle?: string;
  onRetry?: () => void | null;
}

const ErrorView = ({
  code,
  message,
  onRetry,
  subtitle = `Sapiens... &quot;🍌&quot; we have a problem, but don't worry our
engineering team has been already notified and will be working on
fixing this PRONTO`,
}: Props) => {
  const { push, reload } = useRouter();

  useEffect(() => {
    if (message) {
      Sentry.captureMessage(message);
    }
  }, [message]);

  return (
    <div className="min-h-full min-w-full flex flex-col">
      <div className="rounded-md shadow-2xl bg-gray-800 w-full h-full items-center flex justify-center flex-col sm:px-0 px-4 flex-1 py-8">
        <img
          className="w-24 mx-auto mb-8 rounded-r-lg"
          src="/images/harambe_sapien.png"
          alt="sapien"
        />
        <div className="grid gap-6 max-w-lg">
          {code && (
            <p className="text-lg">
              <span className="font-bold">{code}.</span> This is the code of an
              error
            </p>
          )}
          {message && <p className="text-lg">{message}</p>}
          <h2 className="text-white text-5x font-semibold subpixel-antialiased">
            {subtitle}
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
