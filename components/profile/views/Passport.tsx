// components
import { TextareaInput, TextInput } from 'components/common';

// hooks
import { usePassport } from 'hooks/passport';
import { useUserBadges } from 'hooks/user';

// utils
import { formatDate } from 'utils/date';
import { formatAvatarName, formatTokenID } from 'utils/passport';

// assets
import { PolygonFilter } from 'assets';

interface Props {
  selectBadge: (badgeID: string) => void;
}

const Passport = ({ selectBadge }: Props) => {
  const badges = useUserBadges();
  const passport = usePassport();

  return (
    <>
      <PolygonFilter />
      <div className="flex mt-4 gap-5 flex-wrap sm:flex-nowrap">
        <div className="text-center pt-4 flex flex-col justify-between">
          <div className="block h-36 w-40 rotate-90 p-1px hexagon-container">
            <div className="bg-black h-full w-full hexagon flex items-center justify-center">
              <img
                src={passport.image}
                className="-rotate-90 h-full object-cover"
                alt="Passport Figure generated with Machine Learning"
              />
            </div>
          </div>
          <span className="hexagon-2 bg-sapien-60 p-1px text-sm block mt-5 truncate">
            <span className="hexagon-2 bg-sapien-dark-purple block text-gray-300 p-1">
              {formatAvatarName(passport.title) || 'Avatar Name'}
            </span>
          </span>
        </div>
        <div className="w-full">
          <ul className="flex mr-4 justify-between text-xs text-left">
            <li>
              <span className="block font-bold text-gray-400 mb-1">
                Passport Number
              </span>
              <span className="text-gray-300 font-semibold">
                {formatTokenID(Number(passport.tokenId))}
              </span>
            </li>
            <li>
              <span className="block font-bold text-gray-400 mb-1">
                Issue Date
              </span>
              <span className="text-gray-300 font-semibold">
                {formatDate(passport.issueDate, 'LLLL d y')}
              </span>
            </li>
            <li>
              <span className="block font-bold text-gray-400 mb-1">
                Issuing Authority
              </span>
              <span className="text-gray-300 font-semibold">
                {passport.issuingAuthority}
              </span>
            </li>
          </ul>
          <div className="mt-1 justify-between gap-5">
            <span className="block font-bold text-gray-400 mb-2 text-xs">
              Username
            </span>
            <div
              style={{
                clipPath:
                  'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
              }}
              className="mt-1 mr-4 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
            >
              <TextInput
                aria-label="username"
                autoComplete="username"
                className="appearance-none min-h-64px border-sapien-80 block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-lg sm:text-lg"
                name="username"
                placeholder="Username"
                readOnly
                rules={{
                  validate: {
                    required: (value) => value.length > 0 || 'is required',
                  },
                }}
                style={{
                  background: 'transparent',
                }}
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="block font-bold text-gray-400 text-xs">
                Badges
              </span>
            </div>
            {badges.length === 0 ? (
              <div className="flex items-center min-h-64px text-gray-400">
                No badges received
              </div>
            ) : (
              <div
                style={{
                  clipPath:
                    'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                }}
                className="mt-1 mr-4 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
              >
                {badges.length === 1 ? (
                  <button
                    onClick={() => selectBadge(badges[0].id)}
                    className="appearance-none border relative flex items-center min-h-64px bg-transparent border-sapien-80 w-full focus:outline-none focus:border-purple-500"
                  >
                    <span className="bg-gray-800 ml-4">{badges[0].name}</span>
                    <span className="font-bold text-gray-400 text-xs right-0 bottom-0 absolute mr-4 mb-1">
                      Click here to View Badge Details
                    </span>
                  </button>
                ) : (
                  <select
                    className="appearance-none px-4 min-h-64px bg-transparent border-sapien-80 w-full focus:outline-none  focus:border-purple-500"
                    defaultValue={''}
                    name="type"
                    onChange={(event) => {
                      event.preventDefault();
                      selectBadge(event.target.value);
                    }}
                  >
                    {badges.map((badge) => {
                      return (
                        <option
                          className="bg-gray-800"
                          key={badge.id}
                          value={badge.id}
                        >
                          {badge.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          clipPath:
            'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
        }}
        className="mt-3 mr-4 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
      >
        <TextareaInput
          name="bio"
          maxLength={1000}
          placeholder="Bio"
          className="border-[1px] border-sapien-80 text-lg sm:text-lg pl-4 pt-4 text-gray-300"
          readOnly
          rules={{
            validate: {
              maxLength: (value) => {
                if (value?.length > 0) {
                  return (
                    value?.length <= 1001 || 'Must be only 1000 characters long'
                  );
                }
              },
            },
          }}
          value={passport.bio}
          style={{
            background: 'transparent',
          }}
        />
      </div>
    </>
  );
};

export default Passport;
