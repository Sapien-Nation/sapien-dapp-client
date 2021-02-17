import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

//components
import Dialog from 'components/dialog';
import { BadgesStep, MediaStep, RSSStep, SummaryStep } from './steps';

const defaultValues = {
  name: '',
  type: false,
  cover: '',
  avatar: '',
  description: '',
  unique_identifier: ''
};

enum Step {
  ChannelSummary = 1,
  ChannelBadges,
  ChannelMedia,
  ChannelRss
}

interface Props {
  onClose: () => void;
}

const CreateChannel: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(Step.ChannelSummary);
  const methods = useForm({
    defaultValues,
    shouldUnregister: false
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = () => {
    switch (step) {
      case Step.ChannelSummary: {
        setStep(Step.ChannelBadges);
        break;
      }
      case Step.ChannelBadges: {
        setStep(Step.ChannelMedia);
        break;
      }
      case Step.ChannelMedia: {
        setStep(Step.ChannelRss);
        break;
      }
      default:
        onClose();
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case Step.ChannelSummary: {
        onClose();
        break;
      }
      case Step.ChannelBadges: {
        setStep(Step.ChannelSummary);
        break;
      }
      case Step.ChannelMedia: {
        setStep(Step.ChannelBadges);
        break;
      }
      case Step.ChannelRss: {
        setStep(Step.ChannelMedia);
        break;
      }
    }
  };

  const form = 'create-channel';

  const renderForm = () => {
    switch (step) {
      case Step.ChannelSummary:
        return <SummaryStep />;
      case Step.ChannelBadges:
        return <BadgesStep />;
      case Step.ChannelMedia:
        return <MediaStep />;
      case Step.ChannelRss:
        return <RSSStep />;
    }
  };

  return (
    <Dialog
      open
      cancelLabel={step == Step.ChannelSummary ? 'Cancel' : 'Back'}
      confirmLabel={step == Step.ChannelRss ? 'Create' : 'Next'}
      form={form}
      maxWidth="sm"
      title={
        <>
          <Typography variant="h2">New Channel</Typography>
          <Typography variant="caption">
            <Typography
              color="primary"
              style={{
                fontWeight: 600
              }}
              variant="caption"
            >
              Step {step}
            </Typography>{' '}
            / 4
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

export default CreateChannel;
