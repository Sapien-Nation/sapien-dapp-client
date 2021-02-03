import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// mui
import {
  Box,
  Input,
  Switch,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment
} from '@material-ui/core';
import { HelpOutlineOutlined as HelpIcon } from '@material-ui/icons';

//components
import Dialog from 'components/dialog';

const defaultValues = {
  name: '',
  type: false,
  description: '',
  unique_identifier: ''
};

enum Step {
  TribeSummary,
  TribeMedia
}

interface Props {
  onClose: () => void;
}

const CreateTribe: React.FC<Props> = ({ onClose }) => {
  const [step] = useState(Step.TribeSummary);

  const { control, errors, handleSubmit, register /* watch */ } = useForm({
    defaultValues
  });

  // TODO handleNext w/Dialog
  // const handleNext = () => {};

  // TODO handleFormSubmit w/Dialog

  // TODO remove me: debugging
  // console.log(watch('name'));
  // console.log(watch('unique_identifier'));
  // console.log(watch('type'));

  const handleFormSubmit = (data) => {
    console.log(data);
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
                  {defaultValues.description.length} / 36
                </Typography>
              </Box>
              <Input
                id="name"
                name="name"
                inputRef={register({ required: true })}
                fullWidth
                placeholder="Name"
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
                <Typography variant="caption">12 / 36</Typography>
              </Box>
              <Input
                id="unique_identifier"
                name="unique_identifier"
                inputRef={register({ required: true })}
                fullWidth
                startAdornment={<InputAdornment position="start">@</InputAdornment>}
              />
              {errors.unique_identifier && <span>This field is required</span>}
            </FormControl>
            <FormControl required fullWidth>
              <Box
                mb={1.6}
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <InputLabel htmlFor="description">Description</InputLabel>
                <Typography variant="caption">12 / 36</Typography>
              </Box>
              <Input
                id="description"
                name="description"
                rows={3}
                rowsMax={5}
                inputRef={register}
                fullWidth
                multiline
                placeholder="Set brief description"
              />
            </FormControl>
            <Controller
              name="type"
              control={control}
              defaultValue={defaultValues.type}
              rules={{ required: true }}
              render={(props) => (
                <FormControl fullWidth>
                  <Box
                    mb={1.6}
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
                        <Box component="span" mr={1}>
                          Public tribe
                        </Box>
                        <IconButton aria-label="tribe type">
                          <HelpIcon color="primary" />
                        </IconButton>
                      </Box>
                    </InputLabel>
                    <Switch
                      color="default"
                      onChange={(e) => props.onChange(e.target.checked)}
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
        return 'TODO';
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
          padding={5}
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
      onClose={onClose}
    >
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        {renderContent()}
      </form>
    </Dialog>
  );
};

export default CreateTribe;
