import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import {
  Box,
  IconButton,
  InputLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';
import { HelpOutlineOutlined as HelpIcon } from '@material-ui/icons';

//components
import { Dialog, ChartCount } from 'components/common';

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
  const { control, handleSubmit, register } = methods;
  const theme = useTheme();

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
          <TextField
            fullWidth
            required
            inputProps={{
              ...register('name'),
              autoComplete: 'name',
              maxLength: '36',
            }}
            label={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="buttonMedium">Name*</Typography>
                <ChartCount control={control} maxCount={36} name="name" />
              </Box>
            }
            placeholder="Name"
          />
          <TextField
            fullWidth
            required
            inputProps={{
              ...register('unique_identifier'),
              autoComplete: 'unique_identifier',
              maxLength: '15',
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
            label={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="buttonMedium">
                  Unique Identifier*
                </Typography>
                <ChartCount
                  control={control}
                  maxCount={15}
                  name="unique_identifier"
                />
              </Box>
            }
            placeholder="Unique Identifier"
          />
          <TextField
            fullWidth
            multiline
            required
            inputProps={{
              ...register('description'),
              maxLength: '60',
            }}
            label={
              <Box display="flex" justifyContent="space-between">
                <Typography variant="buttonMedium">Description</Typography>
                <ChartCount
                  control={control}
                  maxCount={60}
                  name="description"
                />
              </Box>
            }
            maxRows={5}
            minRows={3}
            placeholder="Set brief description"
          />

          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <InputLabel htmlFor="public">
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <span>Public tribe</span>
                <IconButton
                  aria-label="public"
                  style={{ color: (theme as any).palette.infoIcon.main }}
                >
                  <HelpIcon fontSize="small" />
                </IconButton>
              </Box>
            </InputLabel>
            <Switch disableRipple color="default" name="public" />
          </Box>
        </form>
      </Dialog>
    </FormProvider>
  );
};

export default CreateTribe;
