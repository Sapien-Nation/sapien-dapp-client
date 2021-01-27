import { useForm } from 'react-hook-form';
import { useState } from 'react';
// mui
import { Box, Button, Switch, TextField, FormControl } from '@material-ui/core';

const CreateTribe: React.FC = () => {
  const steps = 2;
  const tribe = {
    name: '',
    type: false,
    cover: '',
    avatar: '',
    description: '',
    unique_identifier: ''
  };
  const [tribeData, setTribeData] = useState(tribe);
  const [currentStep, setStep] = useState(1);
  console.log(tribeData);
  const { register, handleSubmit, errors } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
    setTribeData(data);
    handleNext();
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTribeData({ ...tribeData, [event.target.name]: event.target.checked });
  };

  const handleNext = () => {
    if (currentStep === 2) {
      console.log(tribeData);
      console.log('Submitted!');
      return;
    }
    setStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1: {
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
                defaultValue={tribeData.name}
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
                defaultValue={tribeData.unique_identifier}
              />
              {errors.unique_identifier && <span>This field is required</span>}
            </FormControl>
            <Switch
              color="primary"
              name="type"
              checked={tribeData.type}
              onChange={handleTypeChange}
              inputRef={register({ required: true })}
              inputProps={{ 'aria-label': 'Tribe type' }}
            />
          </Box>
        );
      }
      case 2: {
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
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        New Tribe {`${currentStep} / ${steps}`}
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
