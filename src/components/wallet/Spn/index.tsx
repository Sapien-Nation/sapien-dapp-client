import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Receivers from './Receivers';

// context
import { useWallet } from 'context/wallet';

interface Props {
  showTabsMenu: boolean;
  setShowAuthorToBadge: (status: boolean) => void;
}

const form = 'spn-form';

const Spn = ({ showTabsMenu, setShowAuthorToBadge }: Props) => {
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const { walletOpen } = useWallet();
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  useEffect(() => {
    // @ts-ignore
    if (walletOpen?.userName) {
      setCurrentReceiver({
        // @ts-ignore
        name: walletOpen.userName,
        // @ts-ignore
        description: walletOpen.displayName,
      });
      setShowAuthorToBadge(false);
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
          <Receivers
            currentReceiver={currentReceiver}
            setCurrentReceiver={setCurrentReceiver}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Spn;
