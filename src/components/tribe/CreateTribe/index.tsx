import { useState } from 'react';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

// types
import type { Tribe } from 'tools/types/tribe';

// api
import axios from 'api';

// mui
import { Typography } from '@material-ui/core';

//components
import { Dialog } from 'components/common';
import { MediaStep, TribeSummary } from './steps';

const defaultValues = {
  name: '',
  cover: '',
  public: false,
  avatar: '',
  description: '',
  unique_identifier: '',
};

enum Step {
  TribeSummary = 1,
  TribeMedia,
}

interface Props {
  onClose: () => void;
}

const CreateTribe = ({ onClose }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(Step.TribeSummary);

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (values) => {
    switch (step) {
      case Step.TribeSummary: {
        setStep(Step.TribeMedia);
        break;
      }
      default:
        try {
          // Creating Tribe
          const { data } = await axios.post('/api/tribes/create', values);

          // New tribe placeholder
          const tribe: Tribe = {
            id: String(data),
            name: values.name,
            channels: [],
            cover: '/fixtures/general/1920x200.png',
            image: '/fixtures/256x256/stonks.png',
            membersCount: 0,
            description: '',
            permissions: { canAddChannel: false, canAddSquare: false },
          };

          // UI updates
          mutate(
            '/api/tribes/followed',
            ({ tribes }: { tribes: Array<Tribe> }) => ({
              tribes: [...tribes, tribe],
            }),
            false
          );
          onClose();
        } catch ({ response }) {
          enqueueSnackbar(response.data.message);
        }
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

  const form = 'create-tribe';

  const renderForm = () => {
    switch (step) {
      case Step.TribeSummary: {
        return <TribeSummary />;
      }
      case Step.TribeMedia: {
        return <MediaStep />;
      }
    }
  };

  return (
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
            <Typography
              color="primary"
              style={{
                fontWeight: 600,
              }}
              variant="caption"
            >
              Step {step}
            </Typography>{' '}
            / 2
          </Typography>
        </>
      }
      onCancel={handleBack}
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
          {renderForm()}
        </form>
      </FormProvider>
    </Dialog>
  );
};

export default CreateTribe;
