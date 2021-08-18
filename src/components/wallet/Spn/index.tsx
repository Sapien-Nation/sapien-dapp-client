import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Receivers from './Receivers';

// context
import { useWallet } from 'context/wallet';

const form = 'spn-form';

const Spn = () => {
  const { walletOpen, dispatchWalletState, globalWalletState } = useWallet();
  const { showTabsMenu } = globalWalletState;
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  useEffect(() => {
    // @ts-ignore
    if (walletOpen?.userName) {
      dispatchWalletState({
        type: 'update',
        payload: {
          spnCurrentReceiver: {
            // @ts-ignore
            name: walletOpen.userName,
            // @ts-ignore
            description: walletOpen.displayName,
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
        height: showTabsMenu ? 'calc(100% - 63px)' : '100%',
      }}
    >
      <FormProvider {...methods}>
        <form
          id={form}
          style={{ height: '100%' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Receivers />
        </form>
      </FormProvider>
    </div>
  );
};

export default Spn;
