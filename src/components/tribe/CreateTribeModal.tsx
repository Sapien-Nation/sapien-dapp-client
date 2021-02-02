import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

//components
import Dialog from 'components/dialog';

// mui
import { FormControl, Switch, TextField } from '@material-ui/core';

const defaultValues = {
  name: '',
  type: false,
  unique_identifier: ''
};

enum Step {
  TribeSummary,
  TribeMedia
}

interface Props {
  onClose: () => void;
}

const CreateTribeModal: React.FC<Props> = ({ onClose }) => {
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
            <FormControl fullWidth variant="outlined">
              <TextField
                name="name"
                label="Name"
                margin="dense"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <TextField
                name="unique_identifier"
                label="Unique Identifier"
                margin="dense"
                variant="outlined"
                inputRef={register({ required: true })}
              />
              {errors.unique_identifier && <span>This field is required</span>}
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

export default CreateTribeModal;
