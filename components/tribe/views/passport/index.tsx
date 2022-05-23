import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Lottie from 'react-lottie-player';

// components
import {
  ErrorView,
  Query,
  Redirect,
  SEO,
  TextareaInput,
  TextInput,
} from 'components/common';

// context
import { useToast } from 'context/toast';

// utils
import { formatDate } from 'utils/date';
import { formatAvatarName, formatTokenID } from 'utils/passport';

// types
import type { NextPage } from 'next';
import type { Passport } from 'tools/types/passport';

// assets
import LoadingJSONData from './lottie/Loading.json';

interface Props {
  animationData: any;
  passport: Passport;
}

const PassportTokenIDPage = ({ animationData, passport }: Props) => {
  const [showPassport, setshowPassport] = useState(false);

  const { query } = useRouter();

  const methods = useForm({
    defaultValues: {
      displayName: passport.username, // TODO remove displayName
      username: passport.username,
      bio: 'Coming soon!',
      title: 'Founding Member of the Sapien Nation',
    },
  });

  useEffect(() => {
    if (animationData) {
      setTimeout(() => {
        setshowPassport(true);
      }, 8000);
    }
  }, [animationData]);

  return (
    <div className="inset-0 flex items-center justify-center bg-sapien-neutral-800 lg:rounded-3xl p-5 flex-1">
      <div className="pt-4 px-4 pb-20 text-center sm:block sm:p-0 relative w-full">
        <Lottie
          animationData={animationData}
          play
          loop={false}
          className="max-w-1100px w-full h-660 m-auto absolute left-0 right-0 bottom-0 top-0"
        />
        {showPassport && (
          <div className="px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FormProvider {...methods}>
              <form
                onSubmit={() => setshowPassport(false)}
                id={'updat-profile-form'}
              >
                <div className="flex gap-5 flex-wrap sm:flex-nowrap">
                  <div className="text-center pt-4 flex flex-col justify-between">
                    <div className="bg-sapien-60 block h-32 w-36 hexagon rotate-90 p-1px">
                      <div className="bg-black h-full w-full hexagon flex items-center justify-center">
                        <img
                          src={passport.image}
                          className="-rotate-90 h-full object-cover"
                          alt="Passport Figure generated with Machine Learning "
                        />
                      </div>
                    </div>
                    <span className="hexagon-2 bg-sapien-60 p-1px text-sm block mt-5">
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
                          {formatTokenID(Number(query.tokenID))}
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
                        className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                      >
                        <TextInput
                          aria-label="name"
                          autoComplete="name"
                          className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          name="displayName"
                          placeholder="Name"
                          readOnly
                          rules={{
                            validate: {
                              required: (value) =>
                                value.length > 0 || 'is required',
                            },
                          }}
                          style={{
                            background: 'transparent',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          clipPath:
                            'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                        }}
                        className="mt-3 flex-1 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                      >
                        <TextInput
                          aria-label="username"
                          autoComplete="username"
                          className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          name="username"
                          placeholder="Username"
                          readOnly
                          rules={{
                            validate: {
                              required: (value) =>
                                value.length > 0 || 'is required',
                            },
                          }}
                          style={{
                            background: 'transparent',
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        clipPath:
                          'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                      }}
                      className="mt-3 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                    >
                      <TextInput
                        aria-label="title"
                        autoComplete="title"
                        className="appearance-none min-h-64px border-sapien-80 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        name="title"
                        placeholder="Title"
                        readOnly
                        style={{
                          background: 'transparent',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    clipPath:
                      'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)',
                  }}
                  className="mt-3 relative before:absolute before:pointer-events-none before:h-35px before:w-1px before:bg-sapien-60 before:rotate-45deg before:-top-12px before:left-10px after:absolute after:pointer-events-none after:h-35px after:w-1px after:bg-sapien-60 after:rotate-45deg after:-bottom-[12px] after:right-[10px]"
                >
                  <TextareaInput
                    name="bio"
                    maxLength={1000}
                    placeholder="Bio"
                    className="!border-[1px] !border-sapien-80"
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
                    style={{
                      background: 'transparent',
                    }}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        )}
      </div>
    </div>
  );
};

const PassportTokenIDPageProxy: NextPage = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [animationData, setAnimationData] = useState<object | null>(null);

  const toast = useToast();
  const { query } = useRouter();

  useEffect(() => {
    // work around for 31mb file
    const fetchLottieJSON = async () => {
      setError(null);
      setIsFetching(true);
      try {
        const request = await fetch(
          'https://sapien-poc.s3.us-east-2.amazonaws.com/animations/passport.json'
        );
        const data = await request.json();

        setAnimationData(data);
      } catch (err) {
        setError(err);
      }
      setIsFetching(false);
    };

    if (query.tokenID) {
      fetchLottieJSON();
    }
  }, [query.tokenID]);

  if (!query.tokenID) return null;

  if (isFetching === true)
    return (
      <Lottie
        animationData={LoadingJSONData}
        play
        loop
        className="max-w-1100px w-full h-660 m-auto absolute left-0 right-0 bottom-0 top-0"
      />
    );

  if (error) return <ErrorView message="Error Loading Passport Animation" />;

  return (
    <>
      <SEO title="Sapien Nation Passport" />
      <Query api={`/core-api/passport/metadata/${query.tokenID}`}>
        {(passport: Passport) => {
          if (passport === null) {
            return <Redirect path="/" />;
          }

          return (
            <PassportTokenIDPage
              passport={passport}
              animationData={animationData}
            />
          );
        }}
      </Query>
    </>
  );
};

export default PassportTokenIDPageProxy;
