import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

//components
import { Dialog } from 'components/common';

enum Step {
  TribeSummary = 1,
  TribeMedia,
}

interface Props {
  onClose: () => void;
}

const CreateTribe = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.TribeSummary);
  const methods = useForm();
  const form = 'create-tribe';
  const { handleSubmit } = methods;

  const handleFormSubmit = async () => {
    switch (step) {
      case Step.TribeSummary: {
        setStep(Step.TribeMedia);
        break;
      }
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case Step.TribeSummary: {
        onClose();
        break;
      }
      case Step.TribeMedia: {
        setStep(Step.TribeSummary);
        break;
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open
        cancelLabel={step == Step.TribeSummary ? 'Cancel' : 'Back'}
        confirmLabel={step == Step.TribeSummary ? 'Next' : 'Create'}
        form={form}
        maxWidth="xs"
        title={
          <>
            <Typography variant="h2">New Tribe</Typography>
            <Typography variant="caption">
              <Typography color="primary" variant="caption">
                Step {step}
              </Typography>{' '}
              / 2
            </Typography>
          </>
        }
        onCancel={handleBack}
        onClose={onClose}
      >
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          TO DO
        </form>
      </Dialog>
    </FormProvider>
  );
};

export default CreateTribe;
