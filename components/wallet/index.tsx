import { Fragment, useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { tw } from 'twind';

// icons
import { DotsHorizontalIcon, StarIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/outline';

enum WalletTabs {
  NFT,
  Spn,
  Store,
}

const Wallet = () => {
  const [tab, setTab] = useState<WalletTabs>(WalletTabs.NFT);

  const prevTabReference = useRef<WalletTabs>();
  useEffect(() => {
    prevTabReference.current = tab;
  });
  const prevTab = prevTabReference.current;

  const renderTab = () => {
    return (
      <div className={tw`relative h-full`}>
        <Transition
          show={tab === WalletTabs.NFT}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`${
            prevTab > WalletTabs.NFT ? '-translate-x-full' : 'translate-x-full'
          }`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveFrom={tw`translate-x-0`}
          leaveTo={tw`-translate-x-full`}
        >
          <div
            className={tw`flex justify-center items-center w-full h-96 absolute bg-gray-300`}
          >
            My Nft
          </div>
        </Transition>
        <Transition
          appear
          show={tab === WalletTabs.Spn}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`${
            prevTab > WalletTabs.Spn ? '-translate-x-full' : 'translate-x-full'
          }`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveTo={tw`${
            tab < WalletTabs.Spn ? 'translate-x-full' : 'translate-x-0'
          }`}
          leaveFrom={tw`translate-x-0`}
        >
          <div
            className={tw`flex justify-center items-center w-full h-96 absolute bg-gray-300`}
          >
            Spn
          </div>
        </Transition>
        <Transition
          appear
          show={tab === WalletTabs.Store}
          as={Fragment}
          enter={tw`transition ease-in-out duration-300 transform`}
          enterFrom={tw`translate-x-full`}
          enterTo={tw`translate-x-0`}
          leave={tw`transition ease-in-out duration-300 transform`}
          leaveFrom={tw`translate-x-0`}
          leaveTo={tw`translate-x-full`}
        >
          <div
            className={tw`flex justify-center items-center w-full h-96 absolute bg-gray-300`}
          >
            Store
          </div>
        </Transition>
      </div>
    );
  };
  return (
    <>
      <div
        className={tw`flex justify-between items-center px-4 py-6 border-b border-gray-200`}
      >
        <h5 className={tw`text-xl font-extrabold`}>Wallet</h5>
        <button
          type="button"
          className={tw`bg-white ml-6 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none`}
        >
          <DotsHorizontalIcon className={tw`h-6 w-6`} aria-hidden="true" />
        </button>
      </div>
      <div className={tw`flex p-2`}>
        <button
          className={tw`text(gray-400 sm) gap-1.5 font-bold flex items-center p-3 focus:outline-none`}
          onClick={() => setTab(WalletTabs.NFT)}
        >
          <StarIcon
            className={tw`h-5 w-5 p-0.5 rounded-full border-2 border-gray-400`}
          />
          My NFTs
        </button>
        <button
          className={tw`text(gray-400 sm) group gap-1.5 font-bold flex items-center p-3 focus:outline-none filter grayscale hover:grayscale-0`}
          onClick={() => setTab(WalletTabs.Spn)}
        >
          <svg
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className={tw`opacity-60 group-hover:opacity-100`}
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
                <stop offset="1" stopColor="white" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          Spn
        </button>
        <button
          className={tw`text(gray-400 sm) gap-1.5 p-3 font-bold flex items-center focus:outline-none`}
          onClick={() => setTab(WalletTabs.Store)}
        >
          <ShoppingCartIcon className={tw`h-6 w-6 rounded-full`} />
          Store
        </button>
      </div>
      <div className={tw`h-96 overflow-hidden`}>{renderTab()}</div>
    </>
  );
};

export default Wallet;
