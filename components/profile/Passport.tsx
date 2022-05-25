import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

// assets
import LoadingJSONData from './lottie/Loading.json';

// components
import { Query, SEO } from 'components/common';
import PassportForm from './PassportForm';

interface Props {
  animationData: any;
}

const Passport = ({ animationData }: Props) => {
  const [showPassport, setShowPassport] = useState(false);

  useEffect(() => {
    if (animationData) {
      setTimeout(() => {
        setShowPassport(true);
      }, 8000);
    }
  }, [animationData]);

  return (
    <div className="inset-0 flex items-center justify-center p-5 flex-1">
      <div className="pt-4 px-4 pb-20 text-center sm:block sm:p-0 relative w-full">
        <Lottie
          animationData={animationData}
          play
          loop={false}
          className="max-w-1100px w-full h-660 m-auto absolute left-0 right-0 bottom-0 top-0"
        />
        {showPassport && (
          <div className="px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <PassportForm setShowPassport={setShowPassport} />
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePassport = () => {
  return (
    <>
      <SEO title="Sapien Nation Passport" />
      <Query
        loader={
          <Lottie
            animationData={LoadingJSONData}
            play
            loop
            className="m-auto absolute left-0 right-0 bottom-0 top-0 w-60 h-60"
          />
        }
        api="https://sapien-poc.s3.us-east-2.amazonaws.com/animations/passport.json"
        options={{
          fetcher: async () => {
            try {
              const request = await fetch(
                'https://sapien-poc.s3.us-east-2.amazonaws.com/animations/passport.json'
              );
              const data = await request.json();

              return data;
            } catch (err) {
              return Promise.reject(err);
            }
          },
        }}
      >
        {(animationData: object) => {
          return <Passport animationData={animationData} />;
        }}
      </Query>
    </>
  );
};

export default ProfilePassport;
