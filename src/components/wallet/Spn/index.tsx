import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// components
import Receivers from './Receivers';

interface Props {
  showTabsMenu: boolean;
}

const form = 'spn-form';

const Spn = ({ showTabsMenu }: Props) => {
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
            currentReceiver={currentReceiver}
            setCurrentReceiver={setCurrentReceiver}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Spn;
