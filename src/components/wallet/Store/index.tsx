import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// components
import BadgesList from './BadgesList';
import Confirmation from './Confirmation';
import Checkout from './Checkout';

// emums
import { StoreSteps } from '../WalletEnums';

interface Props {
  showTabsMenu: boolean;
  setShowTabsMenu: (status: boolean) => void;
}

const form = 'buy-badge-form';

const Store = ({ showTabsMenu, setShowTabsMenu }: Props) => {
  const [step, setStep] = useState(StoreSteps.Badges);
  const [currentBadge, setCurrentBadge] = useState<BadgeType | null>();
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  const { handleSubmit } = methods;
  const handleFormSubmit = async () => {
    if (step === StoreSteps.Badges) return setStep(StoreSteps.Confirmation);
    if (step === StoreSteps.Confirmation) return setStep(StoreSteps.Checkout);
    if (step === StoreSteps.Checkout) return setStep(StoreSteps.Badges);
  };

  const renderStep = () => {
    switch (step) {
      case StoreSteps.Badges:
        return (
          <BadgesList
            setCurrentBadge={setCurrentBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
          />
        );
      case StoreSteps.Confirmation:
        return (
          <Confirmation
            currentBadge={currentBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
          />
        );
      case StoreSteps.Checkout:
        return (
          <Checkout
            currentBadge={currentBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
          />
        );
    }
  };
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
          {renderStep()}
        </form>
      </FormProvider>
    </div>
  );
};

export default Store;
