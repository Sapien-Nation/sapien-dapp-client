import { CSSTransition } from 'react-transition-group';
import { useForm, FormProvider } from 'react-hook-form';

// components
import BadgesList from './BadgesList';
import Receivers from './Receivers';
import Confirmation from './Confirmation';

// context
import { useWallet } from 'context/wallet';

// emums
import { MyBadgesSteps } from '../WalletEnums';

const form = 'my-badges-form';

const MyBadges = () => {
  const { globalWalletState, dispatchWalletState } = useWallet();
  const { myBadgesStep, myBadgesTransition, showTabsMenu } = globalWalletState;
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  const { handleSubmit } = methods;

  const handleFormSubmit = async () => {
    if (myBadgesStep === MyBadgesSteps.Badges) {
      dispatchWalletState({
        type: 'update',
        payload: {
          myBadgesStep: MyBadgesSteps.Receivers,
          myBadgesTransition: 'forward',
        },
      });
    }
    if (myBadgesStep === MyBadgesSteps.Receivers) {
      dispatchWalletState({
        type: 'myBadgesStep',
        payload: {
          myBadgesStep: MyBadgesSteps.Confirmation,
          myBadgesTransition: 'forward',
        },
      });
    }
    if (myBadgesStep === MyBadgesSteps.Confirmation) {
      dispatchWalletState({
        type: 'myBadgesStep',
        payload: {
          myBadgesStep: MyBadgesSteps.Badges,
          myBadgesTransition: 'forward',
        },
      });
    }
  };

  const renderStep = () => {
    return (
      <>
        <CSSTransition
          unmountOnExit
          classNames={myBadgesTransition}
          in={myBadgesStep === MyBadgesSteps.Badges}
          timeout={300}
        >
          <BadgesList />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={myBadgesTransition}
          in={myBadgesStep === MyBadgesSteps.Receivers}
          timeout={300}
        >
          <Receivers />
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          classNames={myBadgesTransition}
          in={myBadgesStep === MyBadgesSteps.Confirmation}
          timeout={300}
        >
          <Confirmation />
        </CSSTransition>
      </>
    );
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
      {/* <Empty />
      <WalletSkeleton /> */}
    </div>
  );
};

export default MyBadges;
