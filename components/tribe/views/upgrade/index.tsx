// components
import { Query, SEO } from 'components/common';
import { UpgradeView as UpgradeViewComponent, WalletView } from './views';

// providers
import { Web3Provider } from 'wallet/providers';

const distributionURL = process.env.NEXT_PUBLIC_DISTRIBUTION_URL;
const UpgradeView = () => {
  return (
    <Query api="/core-api/passport/signed" loader={null}>
      {({
        hasPassport,
        hasSigned,
      }: {
        hasPassport: boolean;
        hasSigned: boolean;
      }) => {
        if (hasPassport === false)
          return (
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
              </div>
              <div className="left-0 right-0 mx-auto h-full absolute w-full text-center">
                <p className="text-xl text-white font-semibold mt-96 mx-auto w-96 h-96">
                  To upgrade a tribe you need a Sapien Nation Passport. You can{' '}
                  <a
                    href={`${distributionURL}passport/purchase`}
                    className="text-base font-medium bg-[#6200ea] pl-2 pr-2 rounded-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mint
                  </a>{' '}
                  an NFT or get one on a secondary market like{' '}
                  <a
                    href={`https://opensea.io/collection/sapien-nation-passport`}
                    className="text-base font-medium bg-[#6200ea] pl-2 pr-2 rounded-lg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Opensea
                  </a>
                </p>
              </div>
            </div>
          );

        if (hasSigned === false) {
          return (
            <>
              <SEO title="Upgrade" />
              <h1 className="sr-only">Tribe Upgrade View</h1>
              <Web3Provider>
                <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
                  <WalletView />
                </div>
              </Web3Provider>
            </>
          );
        }

        return (
          <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
            <SEO title="Upgrade" />
            <h1 className="sr-only">Tribe Upgrade View</h1>
            <UpgradeViewComponent />
          </div>
        );
      }}
    </Query>
  );
};

export default UpgradeView;
