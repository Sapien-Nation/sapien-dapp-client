import useSWR from 'swr';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Receivers from './Receivers';
import Empty from './Empty';
import TokenFetcher from '../shared/TokenFetcher';

// context
import { useWallet } from 'context/wallet';

// types
import type { Content } from 'tools/types/content';

const form = 'spn-form';

const Spn = () => {
  const { wallet, walletOpen, dispatchWalletState, globalWalletState } =
    useWallet();
  const { showTabsMenu } = globalWalletState;
  const { data: users } = useSWR('/api/v3/users', {
    fetcher: TokenFetcher,
  });
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  useEffect(() => {
    // @ts-ignore
    if (walletOpen?.author?.userName) {
      const userToSpn = walletOpen as Content;
      const userToSpnComplete = users.find(
        (user) => user.id === userToSpn.author.id
      );
      dispatchWalletState({
        type: 'update',
        payload: {
          spnCurrentReceiver: {
            userName: userToSpn.author?.userName,
            displayName: userToSpn.author?.displayName,
            contentId: userToSpn.id,
            publicAddress: userToSpnComplete?.publicAddress,
          },
          showAuthorToBadge: false,
        },
      });
    }
  }, []);
  const { handleSubmit } = methods;
  const handleFormSubmit = async () => {};
  return (
    <div
      style={{
        height: showTabsMenu ? '448px' : '100%',
      }}
    >
      {Number(wallet?.balance) > 0 ? (
        <FormProvider {...methods}>
          <form
            id={form}
            style={{ height: '100%' }}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Receivers />
          </form>
        </FormProvider>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Spn;
