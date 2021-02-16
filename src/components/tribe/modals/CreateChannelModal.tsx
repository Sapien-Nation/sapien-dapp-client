import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// mui
import {
  Box,
  FormControl,
  Input,
  IconButton,
  InputLabel,
  makeStyles,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//icons
import { Add as AddIcon } from '@material-ui/icons';

// styles
import { background, lightGrey } from 'styles/colors';

//components
import Dialog from 'components/dialog';
import DropZone from 'components/dropzone';

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

const useStyles = makeStyles(() => ({
  dropzone: () => ({
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    margin: '1.6rem 0'
  }),
  avatar: {
    width: '6.4rem',
    height: '6.4rem'
  },
  cover: {
    width: '100%',
    height: '10rem'
  }
}));

interface Props {
  onClose: () => void;
}

const CreateChannelModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(Step.ChannelSummary);

  const theme = useTheme();
  const methods = useForm({
    defaultValues,
    shouldUnregister: false
  });

  const { control, handleSubmit, register, watch } = methods;

  const classes = useStyles();

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

  const getChartCount = (field: string, maxCount: string) => {
    const val = watch(field) as string;
    return (
      <Typography data-testid="chart-count" variant="caption">
        {val?.length || 0} / {maxCount}
      </Typography>
    );
  };

  const renderForm = () => {
    switch (step) {
      case Step.ChannelSummary: {
        return (
          <>
            <FormControl fullWidth required>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1}
              >
                <InputLabel htmlFor="name">Name</InputLabel>
                {getChartCount('name', '36')}
              </Box>
              <Input
                fullWidth
                id="name"
                inputRef={register({ required: true, maxLength: 36 })}
                name="name"
                placeholder="Name"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: theme.spacing(0.5) }}>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1.6}
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                {getChartCount('description', '60')}
              </Box>
              <Input
                fullWidth
                multiline
                id="description"
                inputRef={register({ required: true, maxLength: 60 })}
                name="description"
                placeholder="Set brief description"
                rows={3}
                rowsMax={5}
              />
            </FormControl>
          </>
        );
      }
      case Step.ChannelBadges: {
        return (
          <>
            <Box>Channel badges</Box>
          </>
        );
      }
      case Step.ChannelMedia: {
        return (
          <>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Avatar</InputLabel>
              <DropZone
                accept="image/*"
                className={`${classes.dropzone} ${classes.avatar}`}
                maxFiles={1}
                maxSize={20971520}
                name="avatar"
                render={() => {
                  return (
                    <IconButton
                      aria-label="tribe type"
                      style={{ color: theme.palette.infoIcon.main }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  );
                }}
              />
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 20MB)
              </Typography>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Cover image</InputLabel>
              <DropZone
                accept="image/*"
                className={`${classes.dropzone} ${classes.cover}`}
                maxFiles={1}
                maxSize={41943040}
                name="cover"
                render={() => {
                  return (
                    <IconButton
                      aria-label="tribe type"
                      style={{ color: theme.palette.infoIcon.main }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  );
                }}
              />
              <Typography variant="caption">
                Drag and Drop or{' '}
                <Typography color="primary" variant="caption">
                  Browse{' '}
                </Typography>
                to upload image (max 40MB)
              </Typography>
            </FormControl>
          </>
        );
      }
      case Step.ChannelRss: {
        return (
          <>
            <Box>Channel Rss</Box>
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open
      cancelLabel={step == Step.ChannelSummary ? 'Cancel' : 'Back'}
      confirmLabel={step == Step.ChannelRss ? 'Create' : 'Next'}
      form={form}
      maxWidth="xs"
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

export default CreateChannelModal;
