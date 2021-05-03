import { useFormContext } from 'react-hook-form';

// mui
import { InputAdornment } from '@material-ui/core';

//components
import { TextInput, Switch } from 'components/common';

const SummaryStep = () => {
  const {
    register,
    formState: { errors },
    watch,
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

  const currentName = watch('name');
  const currentDescription = watch('description');
  const currentUniqueIdentifier = watch('unique_identifier');

  return (
    <>
      <TextInput
        fullWidth
        chartCount="36"
        currentChartCount={currentName?.length}
        errors={errors}
        inputRef={nameRef}
        label="Name"
        placeholder="Name"
        {...nameRest}
      />
      <TextInput
        fullWidth
        chartCount="15"
        currentChartCount={currentUniqueIdentifier?.length}
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
        currentChartCount={currentDescription?.length}
        errors={errors}
        inputRef={descriptionRef}
        label="Description"
        maxRows={5}
        minRows={3}
        placeholder="Set brief description"
        {...descriptionRest}
      />
      <Switch errors={errors} label="Public tribe" name="public" />
    </>
  );
};

export default SummaryStep;
