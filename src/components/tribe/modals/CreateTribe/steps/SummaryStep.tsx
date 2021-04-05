import { useFormContext } from 'react-hook-form';

// mui
import { InputAdornment } from '@material-ui/core';

//components
import { TextInput, Switch } from 'components/form';

const SummaryStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { ref: nameRef, ...nameRest } = register('name', {
    required: 'Name is required',
    validate: {
      maxLength: (val = '') => val.length <= 36 || 'Name its to long',
    },
  });
  const { ref: uniqueRef, ...uniqueRest } = register('unique_identifier', {
    required: 'Unique Identifier is required',
    validate: {
      maxLength: (val = '') =>
        val.length <= 15 || 'Unique Identifier its to long',
    },
  });
  const { ref: descriptionRef, ...descriptionRest } = register('description', {
    required: 'Description is required',
    validate: {
      maxLength: (val = '') => val.length <= 60 || 'Description its to long',
    },
  });

  return (
    <>
      <TextInput
        fullWidth
        chartCount="36"
        errors={errors}
        inputRef={nameRef}
        label="Name"
        placeholder="Name"
        {...nameRest}
      />
      <TextInput
        fullWidth
        chartCount="15"
        errors={errors}
        inputRef={uniqueRef}
        label="Unique Identifier"
        startAdornment={<InputAdornment position="start">@</InputAdornment>}
        {...uniqueRest}
      />
      <TextInput
        fullWidth
        multiline
        chartCount="60"
        errors={errors}
        inputRef={descriptionRef}
        label="Description"
        placeholder="Set brief description"
        rows={3}
        rowsMax={5}
        {...descriptionRest}
      />
      <Switch errors={errors} label="Public tribe" name="public" />
    </>
  );
};

export default SummaryStep;
