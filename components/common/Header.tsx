import { tw } from 'twind';

// types
import type { ProfileTribe } from 'tools/types/tribe';

interface Props {
  tribe: ProfileTribe;
}

const Header = ({ tribe }: Props) => {
  const { avatar, name } = tribe;
  return (
    <div>
      <div>
        <img
          className={tw`h-32 w-full object-cover lg:h-48`}
          src="/images/default_cover.jpeg"
          alt=""
        />
      </div>
      <div className={tw`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={tw`-mt-12 sm:-mt-6 sm:flex sm:items-end sm:space-x-5`}>
          <div className={tw`flex`}>
            <img
              className={tw`h-24 w-24 rounded-3xl ring-4 ring-white sm:h-32 sm:w-32`}
              src={avatar}
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  '/images/default_temp.jpeg';
              }}
              alt="Tribe Avatar"
            />
          </div>
          <div
            className={tw`mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1`}
          >
            <div className={tw`sm:hidden md:block mt-6 min-w-0 flex-1`}>
              <h1 className={tw`text-2xl font-bold text-gray-900 truncate`}>
                {name}
              </h1>
            </div>
            <div
              className={tw`mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4`}
            >
              <button
                type="button"
                className={tw`inline-flex justify-center px-4 py-2  shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              >
                <span>Join Tribe</span>
              </button>
              <button
                type="button"
                className={tw`inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              >
                <span>Follow</span>
              </button>
            </div>
          </div>
        </div>
        <div className={tw`hidden sm:block md:hidden mt-6 min-w-0 flex-1`}>
          <h1 className={tw`text-2xl font-bold text-gray-900 truncate`}>
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
