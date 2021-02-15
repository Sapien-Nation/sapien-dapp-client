import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

// mui
import {
  Box,
  FormControl,
  Input,
  IconButton,
  InputLabel,
  InputAdornment,
  makeStyles,
  Switch,
  Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//icons
import { HelpOutlineOutlined as HelpIcon, Add as AddIcon } from '@material-ui/icons';

// styles
import { background, lightGrey } from 'styles/colors';

//components
import ChartCount from 'components/general/form';
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
  TribeSummary = 1,
  TribeMedia
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

const CreateTribeModal: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(Step.TribeSummary);

  const theme = useTheme();
  const methods = useForm({
    defaultValues,
    shouldUnregister: false
  });

  const { control, handleSubmit, register } = methods;

  const classes = useStyles();

  const handleFormSubmit = () => {
    switch (step) {
      case Step.TribeSummary: {
        setStep(Step.TribeMedia);
        break;
      }
      default:
        onClose();
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
                <ChartCount field="name" maxCount="36" />
              </Box>
              <Input
                fullWidth
                id="name"
                inputRef={register({ required: true, maxLength: 36 })}
                name="name"
                placeholder="Name"
              />
            </FormControl>
            <FormControl fullWidth required>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={1.6}
              >
                <InputLabel htmlFor="unique_identifier">
                  Unique Identifier
                </InputLabel>
                <ChartCount field="unique_identifier" maxCount="15" />
              </Box>
              <Input
                fullWidth
                id="unique_identifier"
                inputRef={register({ required: true, maxLength: 15 })}
                name="unique_identifier"
                startAdornment={<InputAdornment position="start">@</InputAdornment>}
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
                <ChartCount field="description" maxCount="60" />
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
            <Controller
              control={control}
              name="type"
              render={(props) => (
                <FormControl fullWidth>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <InputLabel htmlFor="unique_identifier">
                      <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Box component="span">Public tribe</Box>
                        <IconButton
                          aria-label="tribe type"
                          style={{ color: theme.palette.infoIcon.main }}
                        >
                          <HelpIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </InputLabel>
                    <Switch
                      disableRipple
                      checked={props.value}
                      color="default"
                      inputProps={{ 'aria-label': 'Tribe Type' }}
                      onChange={(e) => {
                        props.onChange(e.target.checked);
                      }}
                    />
                  </Box>
                </FormControl>
              )}
            />
          </>
        );
      }
      case Step.TribeMedia: {
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
                fontWeight: 600
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

export default CreateTribeModal;
