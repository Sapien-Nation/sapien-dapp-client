import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { RssIcon, GlobeAltIcon } from '@heroicons/react/outline';

// assets
import { FullLogo } from 'assets';

// components
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const links = [
  {
    title: 'General Room',
    description: 'Join our general room',
    icon: RssIcon,
    path: '/',
  },
  {
    title: 'Discovery',
    description: 'Discover new tribes here',
    icon: GlobeAltIcon,
    path: '/discovery',
  },
];

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head title="404" />
      <div className="text-center h-full w-full flex justify-center">
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 pt-16 mt-6">
            <img
              className="mx-auto h-12 w-auto"
              src="/images/logooutlined.svg"
              alt="sapien"
            />
          </div>
          <div className="max-w-xl mx-auto py-16 sm:py-24">
            <div className="text-center">
              <p className="text-2xl font-semibold text-white uppercase tracking-wide">
                Ops..
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-400 tracking-tight sm:text-5xl">
                This page does not exist.
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                The page you are looking for could not be found.
              </p>
            </div>
            <div className="mt-12">
              <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                Popular pages
              </h2>
              <ul
                role="list"
                className="mt-4 border-t border-b border-gray-800 divide-y divide-gray-800"
              >
                {links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="relative py-6 flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-50">
                        <link.icon
                          className="h-6 w-6 text-indigo-700"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <h3 className="text-base font-medium text-white">
                        <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <Link href={link.path} passHref>
                            <a className="block"># {link.title}</a>
                          </Link>
                        </span>
                      </h3>
                      <p className="text-base text-gray-500">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link href="/">
                  <a className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Back Home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
