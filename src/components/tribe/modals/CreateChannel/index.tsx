import { useState } from 'react';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

// types
import type { Channel } from 'types/channel';
import type { Tribe } from 'types/tribe';

// mui
import { Typography } from '@material-ui/core';

// api
import axios from 'api';

// constants
import { NavigationTypes } from 'context/tribes';

// context
import { useNavigation } from 'context/tribes';

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
  const { enqueueSnackbar } = useSnackbar();
  const [navigation, setNativation] = useNavigation();
  const methods = useForm({
    defaultValues,
    shouldUnregister: false
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = async (values) => {
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
        try {
          // Creating Channel
          const { data } = await axios.post('/api/channels/create', values);

          // New Channel placeholder
          const channel: Channel = {
            id: String(data),
            name: values.name,
            image: '/fixtures/40x40/cars.png',
            memberCount: 0,
            lastUpdate: new Date().toISOString()
          };

          // UI update
          mutate(
            '/api/tribes/followed',
            ({ tribes }: { tribes: Array<Tribe> }) => ({
              tribes: tribes.map((tribe) => {
                if (tribe.id === navigation.main.id) {
                  return {
                    ...tribe,
                    channels: [...tribe.channels, channel]
                  };
                }
                return tribe;
              })
            }),
            false
          );
          setNativation({
            ...navigation,
            secondary: channel.id,
            type: NavigationTypes.Channel
          });
          onClose();
        } catch ({ response }) {
          enqueueSnackbar(response.data.message);
        }
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
