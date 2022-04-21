import { CameraIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

// api
import { authFetcher as fetcher } from 'api';

// components
import { Dialog, Query } from 'components/common';

// types
import { PublicProfile } from 'tools/types/user';

interface Props {
  profileID: string;
  onClose: () => void;
}

const PublicProfileDialog = ({ profileID, onClose }: Props) => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowDialog(true), 4000);
  }, []);

  const renderView = (profile: PublicProfile) => {
    if (profile.passport === null || profile.passport === undefined) {
      return (
        <div className="bg-sapien-neutral-600 rounded-xl mb-4">
          <div className="bg-gradient-to-r bg-sapien-neutral-200 h-28 shadow-md rounded-lg relative flex justify-center items-center py-4" />
          <div className="flex flex-col md:flex-row py-4">
            <div className="relative md:ml-4 ml-0 flex flex-col items-center">
              <div className="w-20 h-20 -mt-16 rounded-full flex-shrink-0 bg-sapien-neutral-200 shadow shadow-sapien-neutral-600 flex items-center justify-center font-extrabold text-xl">
                user
              </div>
              <h1 className="text-md mt-2">{profile.displayName}</h1>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-sm mb-2">User info</h2>
            <div className="border-t border-gray-800 pt-4">
              <p className="text-xs text-gray-400">{profile.bio}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <dl>
        <div className="flex gap-5 flex-wrap sm:flex-nowrap">
          <div className="text-center flex flex-col justify-between">
            <div className="bg-sapien-60 block h-32 w-36 hexagon rotate-90 p-[1px]">
              <div className="bg-gray-700 h-full w-full hexagon flex items-center justify-center">
                <CameraIcon className="w-5 -rotate-90 text-sapien-60" />
              </div>
            </div>
            <span className="hexagon-2 bg-sapien-60 p-[1px] text-sm block mt-5">
              <span className="hexagon-2 bg-gray-700 block text-gray-400 p-1">
                {profile.displayName}
              </span>
            </span>
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="flex justify-between text-xs text-center">
              <div>
                <dt className="block text-gray-400 mb-1">Passport #</dt>
                <dd className="text-gray-300 font-semibold">BD0000</dd>
              </div>
              <div>
                <dt className="block text-gray-400 mb-1">Issue Date</dt>
                <dd className="text-gray-300 font-semibold">17/04/2022</dd>
              </div>
              <div>
                <dt className="block text-gray-400 mb-1">Issuing Authority</dt>
                <dd className="text-gray-300 font-semibold">Sapien Network</dd>
              </div>
            </div>
            <div className="mt-8 flex justify-between gap-5">
              <div className="flex-1">
                <dt className="block text-gray-400 mb-1">Name</dt>
                <dd
                  style={{
                    clipPath:
                      'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                  }}
                  className="mt-3 p-3 flex items-center !bg-transparent min-h-[64px] border border-sapien-80 relative before:absolute before:pointer-events-none before:h-[30px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[30px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                >
                  {profile.displayName}
                </dd>
              </div>
              <div className="flex-1">
                <dt className="block text-gray-400 mb-1">Username</dt>
                <dd
                  style={{
                    clipPath:
                      'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                  }}
                  className="mt-3 p-3 flex items-center !bg-transparent min-h-[64px] border border-sapien-80 relative before:absolute before:pointer-events-none before:h-[30px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[30px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                >
                  {profile.username}
                </dd>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <dt className="block text-gray-400 mb-1">Title</dt>
          <dd
            style={{
              clipPath:
                'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
            }}
            className="mt-3 p-3 flex items-center !bg-transparent min-h-[64px] border border-sapien-80 relative before:absolute before:pointer-events-none before:h-[30px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[30px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
          >
            {profile.title}
          </dd>
        </div>
        <div className="mt-3">
          <dt className="block text-gray-400 mb-1">Bio</dt>
          <dd
            style={{
              clipPath:
                'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
            }}
            className="mt-3 p-3 flex items-center !bg-transparent min-h-[64px] border border-sapien-80 relative before:absolute before:pointer-events-none before:h-[30px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[30px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
          >
            {profile.bio}
          </dd>
        </div>
      </dl>
    );
  };

  return (
    <>
      <div className="fixed z-10 inset-0 bg-opacity-75">
        <div className="flex items-end justify-center min-h-screen bg-opacity-75 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <img
            src="https://cdn.discordapp.com/attachments/965626142059016222/966746093771690004/passport_no_background.gif"
            style={{ width: 1100, height: 660 }}
            alt=""
          />
        </div>
      </div>
      {showDialog && (
        <Dialog show isFetching={false} onClose={onClose}>
          <Query
            api={`/api/v3/user/${profileID}`}
            options={{ fetcher }}
            loader={
              <div className="min-h-250 flex justiy-center items-center">
                <img
                  className="mx-auto h-24 w-auto animate-bounce"
                  src="/images/logooutlined.svg"
                  alt="sapien"
                />
              </div>
            }
          >
            {(profile: PublicProfile) => <>{renderView(profile)}</>}
          </Query>
        </Dialog>
      )}
    </>
  );
};

export default PublicProfileDialog;
