import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//components
import Dialog from 'components/dialog';

// mui
import {
  Box,
  Input,
  Switch,
  Typography,
  InputLabel,
  FormControl,
  InputAdornment
} from '@material-ui/core';

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
                <Switch
                  color="primary"
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                  inputProps={{ 'aria-label': 'Tribe Type' }}
                />
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
      title={`New Tribe ${step === Step.TribeSummary ? 1 : 2} / 2`}
      onClose={onClose}
    >
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        {renderContent()}
      </form>
    </Dialog>
  );
};

export default CreateTribe;
