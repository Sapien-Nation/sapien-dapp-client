import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

// enums
import { MyNFTsSteps } from '../constants';

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

const UsersMock = [
  {
    id: 'u1',
    userName: 'javierocanas',
    displayName: 'Javier Ocanas',
  },
  {
    id: 'u2',
    userName: 'sandyflores',
    displayName: 'Sandy Flores',
  },
  {
    id: 'u3',
    userName: 'aaronlugo',
    displayName: 'Aaron Lugo',
  },
  {
    id: 'u4',
    userName: 'javierocanas',
    displayName: 'Javier Ocanas',
  },
  {
    id: 'u5',
    userName: 'sandyflores',
    displayName: 'Sandy Flores',
  },
  {
    id: 'u6',
    userName: 'aaronlugo',
    displayName: 'Aaron Lugo',
  },
];

const BadgesList = () => {
  const [step, setStep] = useState<MyNFTsSteps>(MyNFTsSteps.BadgesList);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const prevStepReference = useRef<MyNFTsSteps>();
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

  const filteredUsers = searchTerm
    ? UsersMock.filter(({ displayName, userName }) =>
        (displayName || userName).toLocaleLowerCase().includes(searchTerm)
      )
    : UsersMock;
  return (
    <div className="flex w-full h-96 absolute">
      <div className="w-full px-5 py-1">
        <div className="relative w-full mb-3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="pl-4 focus:outline-none focus:shadow-outline"
            >
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </button>
          </span>
          <input
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            type="search"
            name="search"
            className="py-3 px-6 w-full text-sm bg-gray-50 rounded-full pl-14 focus:outline-none"
            placeholder="Search for a badge"
            autoComplete="off"
          />
        </div>

        {filteredNFTs.map((NFT) => (
          <button
            onClick={() => {
              setSearchTerm('');
              setStep(MyNFTsSteps.ReceiversList);
            }}
            key={NFT.id}
            className="flex items-center w-full text-left bg-gray-50 py-4 px-6 rounded-xl cursor-pointer mb-3 focus:outline-none"
          >
            <div className="flex items-center">
              <span className="inline-block relative border-2 border-indigo-600 rounded-full">
                <img
                  className="h-10 w-10 rounded-full border-4 border-white"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="absolute -top-1 -right-1 block px-1 text(xs white) font-bold rounded-full ring-4 ring-white bg-black">
                  {NFT.amount}
                </span>
              </span>
            </div>
            <div className="flex items-center ml-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold">{NFT.name}</span>
                <span className="text(xs gray-500)">{NFT.description}</span>
              </div>
            </div>
            <div className="flex items-center ml-auto gap-2">
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
                    <stop offset="1" stopColor="white" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xs font-bold">0</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BadgesList;
