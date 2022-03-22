import Link from 'next/link';
import { tw } from 'twind';

// assets
import { FullLogo } from 'assets';

// components
import { Head } from 'components/common';

// types
import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
  return (
    <>
      <Head title="404" />
      <div
        className={tw`text-center h-full w-full flex justify-center items-center`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <FullLogo />
          <h1 className={tw`text-xl mt-3 font-semibold lg:text-2xl`}>
            Whoops looks like something went wrong...
          </h1>
          <div className={tw`mt-6 text-center`}>
            <Link href={`/`}>
              <a
                className={tw`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                Back Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
