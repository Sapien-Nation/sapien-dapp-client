import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Receivers from './Receivers';

interface Props {
  showTabsMenu: boolean;
  setShowTabsMenu: (status: boolean) => void;
}

const form = 'spn-form';

const Spn = ({ showTabsMenu, setShowTabsMenu }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentReceiver, setCurrentReceiver] = useState(null);
  const methods = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
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
            setCurrentReceiver={setCurrentReceiver}
            setShowTabsMenu={setShowTabsMenu}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Spn;
