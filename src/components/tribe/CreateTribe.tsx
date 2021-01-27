import { useState } from 'react';
import { useForm } from 'react-hook-form';

// mui
import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  Switch,
  TextField
} from '@material-ui/core';

const tribe = {
  name: '',
  type: false,
  cover: '',
  avatar: '',
  description: '',
  unique_identifier: ''
};

enum Steps {
  TribeInfo = 1,
  TribeMedia
}

const CreateTribe: React.FC = () => {
  const [data, setData] = useState(tribe);
  const [currentStep, setStep] = useState(Steps.TribeInfo);
  const { register, handleSubmit, errors } = useForm();

  const handleFormSubmit = (data) => {
    setData(data);
    handleNext();
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.checked });
  };

  const handleNext = () => {
    if (currentStep === 2) {
      console.log('Submitted!');
      return;
    }
    setStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getTitle = () => {
    return (
      <DialogTitle id="tribe-dialog-title">
        New Tribe {`${currentStep} / 2`}
      </DialogTitle>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case Steps.TribeInfo: {
        return (
          <Box>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="name"
                name="name"
                label="Name"
                margin="dense"
                variant="outlined"
                inputRef={register({ required: true })}
                defaultValue={data.name}
              />
              {errors.name && <span>This field is required</span>}
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="handle"
                name="unique_identifier"
                label="Unique Identifier"
                margin="dense"
                variant="outlined"
                inputRef={register({ required: true })}
                defaultValue={data.unique_identifier}
              />
              {errors.unique_identifier && <span>This field is required</span>}
            </FormControl>
            <Switch
              color="primary"
              name="type"
              checked={data.type}
              onChange={handleTypeChange}
              inputRef={register()}
              inputProps={{ 'aria-label': 'Tribe type' }}
            />
          </Box>
        );
      }
      case Steps.TribeMedia: {
        return (
          <Box>
            <p>Avatar Upload</p>
            <p>Cover Upload</p>
          </Box>
        );
      }
    }
  };

  return (
    <Box>
      {getTitle()}
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        {renderContent()}
        <Button onClick={handleBack} disabled={currentStep === 1}>
          Cancel
        </Button>
        <Button type="submit">Next</Button>
      </form>
    </Box>
  );
};

export default CreateTribe;
