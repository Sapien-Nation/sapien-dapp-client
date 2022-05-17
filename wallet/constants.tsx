// components
import { Query } from 'components/common';

export enum ErrorTypes {
  Fail,
  Success,
}

export const alerts = [
  {
    createdAt: '2022-05-16T18:01:17.160Z',
    id: 1,
    name: 'Sign Passport',
    descriptionShort: 'Its time to sign your passport!',
    descriptionLarge: () => (
      <p>
        Its time to sign your passport! inside a component, go crazy descriptive
        here
      </p>
    ),
  },
  {
    createdAt: '2022-02-20T19:58:50.745Z',
    id: 2,
    name: 'Mint Time!',
    descriptionShort: 'Find your tribe and ignite the new renaissance!',
    descriptionLarge: () => (
      <div className="relative w-full h-44">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="relative flex justify-center items-center mb-5 flex-col h-full w-full gap-4 p-2">
          <span>
            The time has finally come, its time to mint your passport!
          </span>
          <Query api="/core-api/passport/mint-checker">
            {({
              code,
              figureName,
            }: {
              code: number | null;
              figureName: string;
            }) => {
              if (code === 100) {
                return (
                  <div className="mt-4 grid gap-4">
                    <span>
                      Please follow the instructions on your wallet to mint your
                      Sapien Passport
                    </span>
                  </div>
                );
              }

              if (code === null) {
                <div className="mt-4 grid gap-4">
                  <span>Find your tribe and ignite the new renaissance!</span>
                  <span>
                    Champion the values of {figureName} in your sapien tribe
                  </span>
                </div>;
              }

              return null;
            }}
          </Query>
        </div>
      </div>
    ),
  },
];
