import { useState } from 'react';
import { useRouter } from 'next/router';

// components
import { Query } from 'components/common';

// hooks
import { useTribe } from 'hooks/tribe';

enum View {
  Badge,
  Home,
}

const BadgesView = () => {
  const [view] = useState(View.Home);

  const { back, query } = useRouter();

  const tribeID = query.tribeID as string;

  const tribe = useTribe(tribeID);

  //--------------------------------------------------------------------------
  const renderView = () => {
    switch (view) {
      case View.Badge:
        return <h1>Badge Edit view</h1>;
      case View.Home:
        return 'Home Vault View';
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-white">
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  {tribe.name} <span className="font-extrabold">Badges</span>
                </h2>
                <button
                  type="button"
                  onClick={() => back()}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close vault pannel</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <Query
                api={`/core-api/tribe/${tribeID}/vault`}
                options={{
                  fetcher: () => ({
                    badges: [],
                  }),
                }}
                loader={<h1>TODO Vault Loader....</h1>}
              >
                {({ badges }: any) => {
                  <div>
                    {badges.length} TODO render tribe bar with badges and add
                    new badge +<div>{renderView()}</div>
                  </div>;
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesView;
