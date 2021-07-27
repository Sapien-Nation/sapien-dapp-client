import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import BadgesList from './BadgesList';
import Receivers from './Receivers';
import Confirmation from './Confirmation';

// emums
import { MyBadgesSteps } from '../WalletEnums';

interface Props {
  showTabsMenu: boolean;
  setShowTabsMenu: (status: boolean) => void;
}

const form = 'my-badges-form';

const MyBadges = ({ showTabsMenu }: Props) => {
  const [step, setStep] = useState(MyBadgesSteps.Badges);
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  const { handleSubmit } = methods;
  const handleFormSubmit = async () => {
    if (step === MyBadgesSteps.Badges) return setStep(MyBadgesSteps.Receivers);
    if (step === MyBadgesSteps.Receivers)
      return setStep(MyBadgesSteps.Confirmation);
    if (step === MyBadgesSteps.Confirmation)
      return setStep(MyBadgesSteps.Badges);
  };

  const renderStep = () => {
    switch (step) {
      case MyBadgesSteps.Badges:
        return <BadgesList />;
      case MyBadgesSteps.Receivers:
        return <Receivers />;
      case MyBadgesSteps.Confirmation:
        return <Confirmation />;
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

export default MyBadges;
