import Link from 'next/link';

// components
import { UpgradeView, WalletView } from './views';

// constants
import { Role } from 'tools/constants/tribe';
import { PassportStatus } from 'tools/constants/user';

// context
import { useAuth } from 'context/user';

// providers
import { Web3Provider } from 'wallet/providers';

// hooks
import { useTribe } from 'hooks/tribe';
import { useRouter } from 'next/router';
import { NotFound, SEO } from 'components/common';

const UpgradeViewProxy = () => {
  const { me } = useAuth();
  const { query } = useRouter();

  const tribeID = query.tribeID as string;

  const { name, isUpgraded, role } = useTribe(tribeID);

  if (isUpgraded === true) {
    if (role === Role.Owner || role === Role.Admin) {
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
              This tribe has been already been upgraded,{' '}
              <Link href={`/tribes/${tribeID}/vault`} passHref>
                <a className="underline">See the Vault</a>
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return <NotFound message="You dont have access to see this content" />;
  }

  if (me.passport?.status === PassportStatus.P) {
    return (
      <Web3Provider>
        <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
          <WalletView />
        </div>
      </Web3Provider>
    );
  }

  return (
    <div className="bg-sapien-neutral-800 lg:rounded-3xl p-5">
      <SEO title={name} />
      <h1 className="sr-only">Tribe Upgrade View</h1>
      <UpgradeView />
    </div>
  );
};

export default UpgradeViewProxy;
