import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';

// components
import { Head, LottiePlayer } from 'components/common';

// hooks
import { useAuth } from 'context/user';

// types
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const { me } = useAuth();
  return (
    <>
      <Head title="Nation" />
      <div className="bg-gray-50">
        <main className="lg:relative">
          <div className="mx-auto max-w-6xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <p className="mt-3 max-w-md mx-auto uppercase font-extrabold text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Take the control back
              </p>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">The social</span>{' '}
                <span className="block xl:inline">media you/we deserve</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                <b>Sapien Nation</b> now forming!
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-full shadow">
                  <Link href="/passport">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Passport
                    </a>
                  </Link>
                </div>
                <div className="mt-3 rounded-full shadow sm:mt-0 sm:ml-3">
                  {me === null && (
                    <Link href="/register">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Sign up
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full flex items-center justify-center">
            <LottiePlayer lottie="https://assets10.lottiefiles.com/private_files/lf30_tfozcvfo.json" />
          </div>
        </main>
      </div>
      <div className="overflow-hidden my-12">
        <div className="relative max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Sensemaking
            </h2>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Tribes are the basis for social sensemaking
            </p>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid lg:grid-cols-11 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-red-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-red-500">
                  Big Black Box
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Consequuntur omnis dicta cumque, inventore atque ab dolores
                aspernatur tempora ab doloremque.
              </dd>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <ArrowNarrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-green-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-green-500">
                  TribeChat
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Corporis quisquam nostrum nulla veniam recusandae temporibus
                aperiam officia incidunt at distinctio ratione.
              </dd>
            </div>

            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-red-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-red-500">
                  Polarization-to-Profit Pipeline
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Consequuntur omnis dicta cumque, inventore atque ab dolores
                aspernatur tempora ab doloremque.
              </dd>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <ArrowNarrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-green-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-green-500">
                  Metaverse Newspaper
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Corporis quisquam nostrum nulla veniam recusandae temporibus
                aperiam officia incidunt at distinctio ratione.
              </dd>
            </div>

            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-red-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-red-500">
                  Erosion of Communities
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Consequuntur omnis dicta cumque, inventore atque ab dolores
                aspernatur tempora ab doloremque.
              </dd>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <ArrowNarrowRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="lg:col-span-5 rounded-lg shadow-lg px-6 py-6 border-4 border-green-200">
              <dt>
                <p className="flex text-lg leading-6 font-medium text-gray-900 text-green-500">
                  Digital Passport
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                Corporis quisquam nostrum nulla veniam recusandae temporibus
                aperiam officia incidunt at distinctio ratione.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
