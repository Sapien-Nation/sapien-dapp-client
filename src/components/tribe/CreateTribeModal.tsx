import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

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

const CreateTribe: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(Step.TribeSummary);
  const theme = useTheme();
  const [data, setData] = useState(defaultValues);
  const { control, errors, handleSubmit, register, watch, setValue } = useForm();
  const classes = useStyles();
  const formId = 'create-tribe';

  const handleFormSubmit = (formData) => {
    const result = { ...data, ...formData };
    setData(result);
    handleNext(result);
  };

  const handleNext = (data) => {
    switch (step) {
      case Step.TribeSummary: {
        setStep(Step.TribeMedia);
        break;
      }
      case Step.TribeMedia: {
        console.log(data);
        // Axios call can be here
        onClose();
        break;
      }
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
      }
    }
  };

  const renderContent = () => {
    switch (step) {
      case Step.TribeSummary: {
        return (
          <>
            <FormControl required fullWidth>
              <Box
                mb={1}
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <InputLabel htmlFor="name">Name</InputLabel>
                <Typography variant="caption">
                  {watch('name')?.length || 0} / 36
                </Typography>
              </Box>
              <Input
                id="name"
                name="name"
                inputRef={register({ required: true })}
                fullWidth
                placeholder="Name"
                inputProps={{ maxLength: 36 }}
                defaultValue={data.name}
              />
              {errors.name && <span>This field is required</span>}
            </FormControl>
            <FormControl required fullWidth>
              <Box
                mb={1.6}
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <InputLabel htmlFor="unique_identifier">
                  Unique Identifier
                </InputLabel>
                <Typography variant="caption">
                  {watch('unique_identifier')?.length || 0} / 15
                </Typography>
              </Box>
              <Input
                id="unique_identifier"
                name="unique_identifier"
                inputRef={register({ required: true })}
                fullWidth
                startAdornment={<InputAdornment position="start">@</InputAdornment>}
                inputProps={{ maxLength: 15 }}
                defaultValue={data.unique_identifier}
              />
              {errors.unique_identifier && <span>This field is required</span>}
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: theme.spacing(0.5) }}>
              <Box
                mb={1.6}
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <Typography variant="caption">
                  {watch('description')?.length || 0} / 60
                </Typography>
              </Box>
              <Input
                id="description"
                name="description"
                rows={3}
                rowsMax={5}
                inputRef={register}
                fullWidth
                multiline
                inputProps={{ maxLength: 60 }}
                placeholder="Set brief description"
                defaultValue={data.description}
              />
            </FormControl>
            <Controller
              name="type"
              control={control}
              defaultValue={data.type}
              render={(props) => (
                <FormControl fullWidth>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <InputLabel htmlFor="unique_identifier">
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Box component="span">Public tribe</Box>
                        <IconButton
                          style={{ color: theme.palette.infoIcon.main }}
                          aria-label="tribe type"
                        >
                          <HelpIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </InputLabel>
                    <Switch
                      color="default"
                      onChange={(e) => {
                        props.onChange(e.target.checked);
                      }}
                      checked={props.value}
                      disableRipple
                      inputProps={{ 'aria-label': 'Tribe Type' }}
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
            <Controller
              name="avatar"
              control={control}
              defaultValue={data.avatar}
              render={() => (
                <FormControl fullWidth>
                  <InputLabel htmlFor="description">Avatar</InputLabel>
                  <DropZone
                    accept="image/*"
                    maxFiles={1}
                    maxSize={20971520} // 20mb
                    handleDrop={(files) => setValue('avatar', files[0])}
                    className={`${classes.dropzone} ${classes.avatar}`}
                    renderElement={() => {
                      return (
                        <IconButton
                          style={{ color: theme.palette.infoIcon.main }}
                          aria-label="tribe type"
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
              )}
            />
            <Controller
              name="cover"
              control={control}
              defaultValue={data.cover}
              render={() => (
                <FormControl fullWidth>
                  <InputLabel htmlFor="description">Cover image</InputLabel>
                  <DropZone
                    accept="image/*"
                    maxFiles={1}
                    maxSize={41943040} // 40mb
                    className={`${classes.dropzone} ${classes.cover}`}
                    handleDrop={(files) => setValue('cover', files[0])}
                    renderElement={() => {
                      return (
                        <IconButton
                          style={{ color: theme.palette.infoIcon.main }}
                          aria-label="tribe type"
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
              )}
            />
          </>
        );
      }
    }
  };

  return (
    <Dialog
      open
      title={
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          px={5}
          pb={2.5}
          pt={5}
        >
          <Typography variant="h2">New Tribe</Typography>
          <Typography variant="caption">
            <Typography
              variant="caption"
              color="primary"
              style={{
                fontWeight: 600
              }}
            >
              Step {step}
            </Typography>{' '}
            / 2
          </Typography>
        </Box>
      }
      form={formId}
      onClose={handleBack}
      cancelLabel={step == Step.TribeSummary ? 'Cancel' : 'Back'}
      confirmLabel={step == Step.TribeSummary ? 'Next' : 'Create'}
      confirmButtonType="submit"
    >
      <form id={formId} noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        {renderContent()}
      </form>
    </Dialog>
  );
};

export default CreateTribe;
