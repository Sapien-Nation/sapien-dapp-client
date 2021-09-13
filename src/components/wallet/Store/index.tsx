import { useForm, FormProvider } from 'react-hook-form';

// context
import { useWallet } from 'context/wallet';

// components
import BadgesList from './BadgesList';
import Confirmation from './Confirmation';
import Checkout from './Checkout';

// emums
import { StoreSteps } from '../WalletEnums';

const form = 'buy-badge-form';

const Store = () => {
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: true,
    },
  });
  const { globalWalletState, dispatchWalletState } = useWallet();
  const { showTabsMenu, storeStep } = globalWalletState;
  const { handleSubmit } = methods;
  const handleFormSubmit = async () => {
    if (storeStep === StoreSteps.Badges)
      return dispatchWalletState({
        type: 'storeStep',
        payload: StoreSteps.Confirmation,
      });
    if (storeStep === StoreSteps.Confirmation)
      return dispatchWalletState({
        type: 'storeStep',
        payload: StoreSteps.Checkout,
      });
    if (storeStep === StoreSteps.Checkout)
      return dispatchWalletState({
        type: 'storeStep',
        payload: StoreSteps.Badges,
      });
  };

  const renderStep = () => {
    switch (storeStep) {
      case StoreSteps.Badges:
        return <BadgesList />;
      case StoreSteps.Confirmation:
        return <Confirmation />;
      case StoreSteps.Checkout:
        return <Checkout />;
    }
  };
  return (
    <div
      style={{
        height: showTabsMenu ? '448px' : '100%',
      }}
    >
      <FormProvider {...methods}>
        <form
          id={form}
          style={{ height: '100%' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {renderStep()}
        </form>
      </FormProvider>
    </div>
  );
};

export default Store;
