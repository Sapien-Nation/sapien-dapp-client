import { useState, Fragment, useEffect, useRef } from 'react';
import { tw } from 'twind';
import { Transition } from '@headlessui/react';
import { SearchIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { ArrowLeftIcon } from '@heroicons/react/solid';

// components
import { NumericInputCounter } from 'components/common';

enum StoreSteps {
  BadgesList,
  Confirmation,
  Checkout,
}

const NFTMock = [
  {
    id: '1',
    name: 'Mazda club member badge',
    description: 'Zoom zoom lovers',
    amount: 2,
  },
  {
    id: '2',
    name: 'Sapien member badge',
    description: 'Lifetime membership token for sapien',
    amount: 2,
  },
  {
    id: '3',
    name: 'Love society ',
    description: 'Society',
    amount: 1,
  },
];

const Store = () => {
  const [step, setStep] = useState<StoreSteps>(StoreSteps.BadgesList);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const prevStepReference = useRef<StoreSteps>();
  useEffect(() => {
    prevStepReference.current = step;
  });
  const prevStep = prevStepReference.current;

  // TODO remove this data
  const filteredNFTs = searchTerm
    ? NFTMock.filter(({ name }) =>
        name.toLocaleLowerCase().includes(searchTerm)
      )
    : NFTMock;

  return (
    <div>
      <div className={tw`flex w-full h-96 absolute`}>
        <Transition
          show={step === StoreSteps.BadgesList}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`${
            prevStep > StoreSteps.BadgesList
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveFrom={tw`translate-x-0`}
          leaveTo={tw`-translate-x-full`}
        >
          <div className={tw`flex w-full h-96 absolute`}>
            <div className={tw`w-full px-5 py-1`}>
              <div className={tw`relative w-full mb-3`}>
                <span
                  className={tw`absolute inset-y-0 left-0 flex items-center pl-2`}
                >
                  <button
                    type="submit"
                    className={tw`pl-4 focus:outline-none focus:shadow-outline`}
                  >
                    <SearchIcon className={tw`w-5 h-5 text-gray-400`} />
                  </button>
                </span>
                <input
                  onChange={(event) => setSearchTerm(event.currentTarget.value)}
                  type="search"
                  name="search"
                  className={tw`py-3 px-6 w-full text-sm bg-gray-50 rounded-full pl-14 focus:outline-none`}
                  placeholder="Search for a badge"
                  autoComplete="off"
                />
              </div>

              {filteredNFTs.map((NFT) => (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStep(StoreSteps.Confirmation);
                  }}
                  key={NFT.id}
                  className={tw`flex items-center w-full text-left bg-gray-50 py-4 px-6 rounded-xl cursor-pointer mb-3 focus:outline-none`}
                >
                  <div className={tw`flex items-center`}>
                    <span
                      className={tw`inline-block relative border-2 border-indigo-600 rounded-full`}
                    >
                      <img
                        className={tw`h-10 w-10 rounded-full border-4 border-white`}
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <span
                        className={tw`absolute -top-1 -right-1 block px-1 text(xs white) font-bold rounded-full ring-4 ring-white bg-black`}
                      >
                        {NFT.amount}
                      </span>
                    </span>
                  </div>
                  <div className={tw`flex items-center ml-4`}>
                    <div className={tw`flex flex-col`}>
                      <span className={tw`text-xs font-bold`}>{NFT.name}</span>
                      <span className={tw`text(xs gray-500)`}>
                        {NFT.description}
                      </span>
                    </div>
                  </div>
                  <div className={tw`flex items-center ml-auto gap-2`}>
                    <svg
                      fill="none"
                      height="18"
                      viewBox="0 0 18 18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
                        fill="#6200EA"
                      ></path>
                      <path
                        d="M9 18C13.9705 18 18 13.9705 18 9C18 4.02943 13.9705 0 9 0C4.02943 0 0 4.02943 0 9C0 13.9705 4.02943 18 9 18Z"
                        fill="url(#paint0_linear)"
                        fillOpacity="0.5"
                      ></path>
                      <path
                        d="M8.94111 2.93555C6.79826 2.97077 5.08984 4.47959 5.08984 6.45806C5.08984 8.77116 6.85109 9.6166 8.65932 10.233C8.95285 10.327 9.19941 10.415 9.41082 10.5031C9.36897 10.2032 9.23091 9.92513 9.01743 9.71047C8.38338 8.92968 7.73172 8.09015 7.64366 7.40326C7.60072 7.18045 7.60306 6.95127 7.65055 6.7294C7.69804 6.50751 7.78971 6.29745 7.92009 6.11174C8.05047 5.92603 8.2169 5.76846 8.40946 5.64842C8.60202 5.52839 8.81677 5.44834 9.04092 5.41305C9.70431 5.41305 10.4675 5.74181 11.4656 6.54024L13.0448 4.47959C11.9107 3.48222 10.4514 2.93318 8.94111 2.93555Z"
                        fill="white"
                        opacity="0.6"
                      ></path>
                      <path
                        d="M9.66936 7.63211C9.29361 7.48534 8.98835 7.36206 8.74765 7.23877C8.77194 7.36238 8.80529 7.48405 8.84746 7.60277C8.88855 7.70257 8.93552 7.80237 8.98249 7.90218C9.13512 8.21333 9.33474 8.48926 9.47568 8.75345C9.92181 9.49319 10.6498 10.2153 10.5911 11.3895C10.5427 11.7423 10.3587 12.0624 10.078 12.2817C9.79734 12.5009 9.4422 12.6021 9.08814 12.5636C8.55515 12.5276 8.03491 12.3843 7.55871 12.1422C7.08252 11.9001 6.66019 11.5642 6.31713 11.1546L4.69678 13.1683C5.25801 13.7595 5.93226 14.232 6.67955 14.5578C7.42683 14.8836 8.23192 15.0559 9.0471 15.0646C10.9433 15.0646 13.3504 14.049 13.3504 11.2779C13.3269 8.9648 11.7418 8.41881 9.66936 7.63211Z"
                        fill="white"
                        opacity="0.6"
                      ></path>
                      <defs>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="paint0_linear"
                          x1="3.44707"
                          x2="15.5971"
                          y1="16.2"
                          y2="2.7"
                        >
                          <stop stopColor="white"></stop>
                          <stop
                            offset="1"
                            stopColor="white"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className={tw`text-xs font-bold`}>0</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Transition>
        <Transition
          appear
          show={step === StoreSteps.Confirmation}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`${
            prevStep > StoreSteps.Confirmation
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveTo={tw`${
            step < StoreSteps.Confirmation
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
          leaveFrom={tw`translate-x-0`}
        >
          <div className={tw`flex flex-col w-full h-96 absolute`}>
            <div className={tw`flex items-center font-bold text-xs px-5 mb-2`}>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStep(StoreSteps.BadgesList);
                }}
              >
                <ArrowLeftIcon className={tw`h-4 h-4 mr-1`} />
              </button>{' '}
              Confirmation
            </div>
            <div className={tw`w-full px-5 py-1`}>
              <div
                className={tw`flex items-center w-full text-left py-3 px-5 rounded-xl cursor-pointer bg-gray-50`}
              >
                <div className={tw`flex items-center`}>
                  <span className={tw`inline-block relative rounded-full`}>
                    <img
                      className={tw`h-10 w-10 rounded-full`}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </span>
                </div>
                <div className={tw`flex items-center jusitfy-between ml-4`}>
                  <div className={tw`flex flex-col gap-1 w-full`}>
                    <span className={tw`text-xs font-bold`}>Javier Ocanas</span>
                    <span className={tw`text(xs gray-500)`}>@javierocanas</span>
                  </div>
                  <button
                    type="button"
                    className={tw`inline-flex items-center p-1 rounded-full focus:outline-none`}
                    onClick={() => setStep(StoreSteps.BadgesList)}
                  >
                    <XIcon
                      className={tw`h-5 w-5 text-gray-400`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <h2 className={tw`text(gray-400 xs) font-bold uppercase mt-4`}>
                Will Receive
              </h2>
              <div
                onClick={() => {
                  if (step === StoreSteps.Confirmation) {
                    return;
                  }
                  setStep(StoreSteps.Confirmation);
                }}
                className={tw`flex items-center w-full text-left bg-gray-50 py-4 px-6 rounded-xl cursor-pointer mb-3 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  <span
                    className={tw`inline-block relative border-2 border-indigo-600 rounded-full`}
                  >
                    <img
                      className={tw`h-10 w-10 rounded-full border-4 border-white`}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </span>
                </div>
                <div className={tw`flex items-center ml-4`}>
                  <div className={tw`flex flex-col`}>
                    <span className={tw`text-xs font-bold`}>
                      This is NFT Name
                    </span>
                    <span className={tw`text(xs gray-500)`}>
                      NF description
                    </span>
                  </div>
                </div>
                <div className={tw`flex items-center ml-auto gap-2`}>
                  <NumericInputCounter name="badgesAmount" />
                </div>
              </div>
            </div>
            <div className={tw`px-5 py-2.5 absolute bottom-2 w-full`}>
              <button
                onClick={() => setStep(StoreSteps.Checkout)}
                type="submit"
                className={tw`
            w-full py-2 px-4 border border-transparent flex items-center justify-center rounded-md shadow-sm text-sm  text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                <ShoppingCartIcon className={tw`h-5 w-5 mr-2`} />
                500
              </button>
            </div>
          </div>
        </Transition>
        <Transition
          appear
          show={step === StoreSteps.Checkout}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`translate-x-full`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveFrom={tw`translate-x-0`}
          leaveTo={tw`translate-x-full`}
        >
          <div className={tw`flex flex-col w-full h-96 absolute`}>
            <div className={tw`flex items-center font-bold text-xs px-5 mb-2`}>
              <button onClick={() => setStep(StoreSteps.Confirmation)}>
                <ArrowLeftIcon className={tw`h-4 h-4 mr-1`} />
              </button>{' '}
              Check Out
            </div>
            <div className={tw`w-full px-5 py-1`}>
              <div
                className={tw`flex items-center w-full text-left py-3 px-5 rounded-xl cursor-pointer bg-gray-50`}
              >
                <div className={tw`flex items-center`}>
                  <span className={tw`inline-block relative rounded-full`}>
                    <img
                      className={tw`h-10 w-10 rounded-full`}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </span>
                </div>
                <div className={tw`flex items-center ml-4`}>
                  <div className={tw`flex flex-col gap-1`}>
                    <span className={tw`text-xs font-bold`}>Javier Ocanas</span>
                    <span className={tw`text(xs gray-500)`}>@javierocanas</span>
                  </div>
                </div>
              </div>
              <h2 className={tw`text(gray-400 xs) font-bold uppercase mt-4`}>
                Will Receive
              </h2>
              <div
                className={tw`flex flex-col items-center w-full text-left py-4 px-6 rounded-xl cursor-pointer mb-3 focus:outline-none`}
              >
                <div className={tw`flex items-center`}>
                  <span
                    className={tw`inline-block relative border-2 border-indigo-600 rounded-full`}
                  >
                    <img
                      className={tw`h-14 w-14 rounded-full border-4 border-white`}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </span>
                </div>
                <div className={tw`flex items-center mt-4`}>
                  <div className={tw`flex flex-col items-center`}>
                    <span className={tw`text-md font-bold`}>
                      This is NFT Name (x2)
                    </span>
                    <span className={tw`text(sm gray-400) mt-2`}>
                      NF description
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={tw`px-5 py-2.5 absolute bottom-2 w-full`}>
              <button
                type="submit"
                className={tw`
            w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                Purchase Token
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Store;
