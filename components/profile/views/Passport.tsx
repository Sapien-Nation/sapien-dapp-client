import { useState } from 'react';
import { useSWRConfig } from 'swr';

// api
import { updateFlairBadge } from 'api/profile';

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
import { useFormContext } from 'react-hook-form';

// context
import { useToast } from 'context/toast';
import { useAuth } from 'context/user';

interface Props {
  badgeID: string;
  viewBadgeDetails: (badgeID: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const Passport = ({ viewBadgeDetails, isEditing, setIsEditing }: Props) => {
  const { me } = useAuth();
  const badges = useUserBadges();
  const passport = usePassport();
  const { mutate } = useSWRConfig();

  const getInitialBadgeValue = () => {
    if (me.flairBadges.length === 0) {
      return badges[0].id;
    }

    return me.flairBadges[0].badgeid;
  };
  const [selectedBadge, setSelectedBadge] = useState(getInitialBadgeValue());

  const toast = useToast();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const handleUpdateBadgeView = async (badgeID) => {
    try {
      setSelectedBadge(badgeID);

      await updateFlairBadge([badgeID]);

      await mutate('/user-api/me');
    } catch (error) {
      toast({ message: error });
    }
  };

  return (
    <>
      <PolygonFilter />
      <div className="flex mt-4 gap-5 flex-wrap sm:flex-nowrap">
        <div className="text-center pt-4 flex flex-col">
          <div className="block h-36 w-40 rotate-90 p-1px hexagon-container">
            <div className="bg-black h-full w-full hexagon flex items-center justify-center">
              <img
                src={passport.image}
                className="-rotate-90 h-full object-cover"
                alt="Passport Figure generated with Machine Learning"
              />
            </div>
          </div>
          <div className="-mt-2">
            <span className="hexagon-2 bg-sapien-60 p-1px text-sm block mt-5 truncate">
              <span className="hexagon-2 bg-sapien-dark-purple block text-gray-300 p-1">
                {formatAvatarName(passport.title) || 'Avatar Name'}
              </span>
            </span>
          </div>
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
                className="appearance-none h-14 border-sapien-80 block w-full px-4 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-lg sm:text-lg"
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

            <div
              style={{
                clipPath:
                  'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
              }}
              className="mt-1 mr-4 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
            >
              {badges.length === 0 ? (
                <div
                  className="h-14 flex items-center border-sapien-80 focus:border-purple-500 focus:outline-none px-4 border rounded-md shadow-sm text-lg sm:text-lg"
                  tabIndex={0}
                >
                  No badges received
                </div>
              ) : (
                <select
                  className="appearance-none px-4 h-14 bg-transparent border-sapien-80 w-full focus:outline-none focus:border-purple-500 rounded-md"
                  name="type"
                  onChange={(event) => {
                    event.preventDefault();
                    handleUpdateBadgeView(event.target.value);
                  }}
                  value={selectedBadge}
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
            <div className="flex justify-end mt-2 mr-3">
              <button
                disabled={isSubmitting}
                className="border border-gray-400 hover:border-gray-100 rounded-md font-semibold text-xs text-gray-400 p-1"
                type="button"
                onClick={() => viewBadgeDetails(selectedBadge)}
              >
                See Badge Details
              </button>
            </div>
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
          className={`${
            isEditing ? 'cursor-auto' : 'cursor-default'
          } border-[1px] border-sapien-80 text-lg sm:text-lg pl-4 pt-4 text-gray-300`}
          readOnly={!isEditing}
          rows={4}
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
      <div className="flex justify-end mt-2 mr-3 gap-3">
        <button
          disabled={isSubmitting}
          className="border border-gray-400 hover:border-gray-100 rounded-md font-semibold text-xs text-gray-400 p-1 min-w-[70px]"
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Bio'}
        </button>
        {isEditing && (
          <button
            disabled={isSubmitting}
            className="border border-gray-400 hover:border-gray-100 rounded-md font-semibold text-xs text-gray-400 p-1 min-w-[70px]"
            type="submit"
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default Passport;
