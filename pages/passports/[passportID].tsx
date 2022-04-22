import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';

import { formatDate } from 'utils/date';
import { formatTokenID, formatAvatarName } from 'utils/passport';

// components
import {
  DialogPassport,
  Query,
  SEO,
  TextareaInput,
  TextInput,
} from 'components/common';

// types
import type { NextPage } from 'next';
import type { Passport } from 'tools/types/passport';

// assets
import lottieJson from 'public/static/passport.json';

interface FormValues {
  bio: string;
}

interface Props {
  passportID: string;
}

interface Props {
  margin?: string;
  width?: string;
  height?: string;
}

const PassportPage = ({ passportID }: Props) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {},
  });

  useEffect(() => {
    if (showAnimation) {
      setTimeout(() => {
        setShowDialog(true);
      }, 8000);
    }
  }, [showAnimation]);

  return (
    <Query api={`/api/v3/passports/${passportID}`}>
      {(passport: Passport) => {
        return (
          <>
            {showAnimation && (
              <div className="fixed z-10 inset-0 flex items-center justify-center bg-sapien-neutral-800 bg-opacity-75 transition-opacity">
                <div className="bg-opacity-75 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <Lottie
                    animationData={lottieJson}
                    play
                    loop={false}
                    style={{
                      margin: '0 auto',
                      width: '1100px',
                      height: '660px',
                    }}
                  />
                </div>
              </div>
            )}
            {showDialog && (
              <DialogPassport
                form="updat-profile-form"
                show
                isFetching={false}
                onClose={() => setShowDialog(false)}
                confirmLabel="Update"
                cancelLabel="Close"
                showCancel={false}
                showConfirm={false}
                showClose={false}
              >
                <div className="px-8">
                  <FormProvider {...methods}>
                    <form
                      onSubmit={() => setShowDialog(false)}
                      id={'updat-profile-form'}
                    >
                      <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                        <div className="text-center pt-4 flex flex-col justify-between">
                          <div className="bg-sapien-60 block h-32 w-36 hexagon rotate-90 p-[1px]">
                            <div className="bg-black h-full w-full hexagon flex items-center justify-center">
                              <img
                                src={passport.image}
                                className="-rotate-90 h-full"
                                alt="Passport Figure generated with Machine Learning"
                              />
                            </div>
                          </div>
                          <span className="hexagon-2 bg-sapien-60 p-[1px] text-sm block mt-5">
                            <span className="hexagon-2 bg-sapien-dark-purple block text-gray-300 p-1">
                              {formatAvatarName(passport.name)}
                            </span>
                          </span>
                        </div>
                        <div className="w-full">
                          <ul className="flex justify-between text-xs text-left">
                            <li>
                              <span className="block font-bold text-gray-400 mb-1">
                                Passport Number
                              </span>
                              <span className="text-gray-300 font-semibold">
                                {/* @ts-ignore */}
                                {formatTokenID(String(passport.tokenId))}
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
                          <div className="mt-1 flex justify-between gap-5">
                            <div
                              style={{
                                clipPath:
                                  'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                              }}
                              className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                            >
                              <TextInput
                                aria-label="name"
                                autoComplete="name"
                                className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                name="name"
                                placeholder="Name"
                                readOnly
                                rules={{
                                  validate: {
                                    required: (value) =>
                                      value.length > 0 || 'is required',
                                  },
                                }}
                              />
                            </div>
                            <div
                              style={{
                                clipPath:
                                  'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                              }}
                              className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                            >
                              <TextInput
                                aria-label="username"
                                autoComplete="username"
                                className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                name="username"
                                placeholder="Username"
                                readOnly
                                rules={{
                                  validate: {
                                    required: (value) =>
                                      value.length > 0 || 'is required',
                                  },
                                }}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              clipPath:
                                'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                            }}
                            className="mt-3 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                          >
                            <TextInput
                              aria-label="title"
                              autoComplete="title"
                              className="!bg-transparent appearance-none min-h-[64px] border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                              name="title"
                              placeholder="Title"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          clipPath:
                            'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                        }}
                        className="mt-3 relative before:absolute before:pointer-events-none before:h-[35px] before:w-[1px] before:bg-sapien-60 before:rotate-[45deg] before:-top-[12px] before:left-[10px] after:absolute after:pointer-events-none after:h-[35px] after:w-[1px] after:bg-sapien-60 after:rotate-[45deg] after:-bottom-[12px] after:right-[10px]"
                      >
                        <TextareaInput
                          name="bio"
                          maxLength={1000}
                          placeholder="Bio"
                          className="!border-[1px] !border-sapien-80 !bg-transparent"
                          readOnly
                          rules={{
                            validate: {
                              maxLength: (value) => {
                                if (value?.length > 0) {
                                  return (
                                    value?.length <= 1001 ||
                                    'Must be only 1000 characters long'
                                  );
                                }
                              },
                            },
                          }}
                          value={passport.bio}
                        />
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </DialogPassport>
            )}
          </>
        );
      }}
    </Query>
  );
};

const PassportPageProxy: NextPage = () => {
  const { query } = useRouter();

  if (!query.passportID) return null;

  return (
    <>
      <SEO title="Sapien Nation Passport" />
      <PassportPage passportID={query.passportID as string} />
    </>
  );
};

export default PassportPageProxy;
