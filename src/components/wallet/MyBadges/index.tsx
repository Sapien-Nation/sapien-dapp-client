import { CSSTransition } from 'react-transition-group';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

// components
import BadgesList from './BadgesList';
import Receivers from './Receivers';
import Confirmation from './Confirmation';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// emums
import { MyBadgesSteps } from '../WalletEnums';

interface Props {
  showTabsMenu: boolean;
  setShowTabsMenu: (status: boolean) => void;
}

const form = 'my-badges-form';

const MyBadges = ({ showTabsMenu, setShowTabsMenu }: Props) => {
  const [step, setStep] = useState(MyBadgesSteps.Badges);
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const [transition, setTransition] = useState('forward');
  const [currentBadge, setCurrentBadge] = useState<BadgeType | null>();
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = async () => {
    console.log('HOLA!');
    setTransition('forward');
    if (step === MyBadgesSteps.Badges) {
      return setStep(MyBadgesSteps.Receivers);
    }
    if (step === MyBadgesSteps.Receivers) {
      return setStep(MyBadgesSteps.Confirmation);
    }
    if (step === MyBadgesSteps.Confirmation) {
      return setStep(MyBadgesSteps.Badges);
    }
  };

  const renderStep = () => {
    return (
      <>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={step === MyBadgesSteps.Badges}
          timeout={300}
        >
          <BadgesList
            setCurrentBadge={setCurrentBadge}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
            setTransition={setTransition}
          />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={step === MyBadgesSteps.Receivers}
          timeout={300}
        >
          <Receivers
            currentBadge={currentBadge}
            setCurrentReceiver={setCurrentReceiver}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
            setTransition={setTransition}
          />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={transition}
          in={step === MyBadgesSteps.Confirmation}
          timeout={300}
        >
          <Confirmation
            currentBadge={currentBadge}
            currentReceiver={currentReceiver}
            setShowTabsMenu={setShowTabsMenu}
            setStep={setStep}
            setTransition={setTransition}
          />
        </CSSTransition>
      </>
    );
  };
  // const renderStep = () => {
  //   switch (step) {
  //     case MyBadgesSteps.Badges:
  //       return (
  //         <BadgesList
  //           setCurrentBadge={setCurrentBadge}
  //           setShowTabsMenu={setShowTabsMenu}
  //           setStep={setStep}
  //         />
  //       );
  //     case MyBadgesSteps.Receivers:
  //       return (
  //         <Receivers
  //           currentBadge={currentBadge}
  //           setCurrentReceiver={setCurrentReceiver}
  //           setShowTabsMenu={setShowTabsMenu}
  //           setStep={setStep}
  //         />
  //       );
  //     case MyBadgesSteps.Confirmation:
  //       return (
  //         <Confirmation
  //           currentBadge={currentBadge}
  //           currentReceiver={currentReceiver}
  //           setShowTabsMenu={setShowTabsMenu}
  //           setStep={setStep}
  //         />
  //       );
  //   }
  // };
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
