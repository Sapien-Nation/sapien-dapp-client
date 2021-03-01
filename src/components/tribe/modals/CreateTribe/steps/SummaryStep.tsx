import { useFormContext } from 'react-hook-form';

// mui
import { InputAdornment } from '@material-ui/core';

//components
import { TextInput, Switch } from 'components/form';

const SummaryStep = () => {
  const { register, errors } = useFormContext();

  return (
    <>
      <TextInput
        fullWidth
        chartCount="36"
        errors={errors}
        inputRef={register({
          required: 'Name is required',
          validate: {
            maxLength: (val = '') => val.length <= 36 || 'Name its to long',
          },
        })}
        label="Name"
        name="name"
        placeholder="Name"
      />
      <TextInput
        fullWidth
        chartCount="15"
        errors={errors}
        inputRef={register({
          required: 'Unique Identifier is required',
          validate: {
            maxLength: (val = '') =>
              val.length <= 15 || 'Unique Identifier its to long',
          },
        })}
        label="Unique Identifier"
        name="unique_identifier"
        startAdornment={<InputAdornment position="start">@</InputAdornment>}
      />
      <TextInput
        fullWidth
        multiline
        chartCount="60"
        errors={errors}
        inputRef={register({
          required: 'Description is required',
          validate: {
            maxLength: (val = '') =>
              val.length <= 60 || 'Description its to long',
          },
        })}
        label="Description"
        name="description"
        placeholder="Set brief description"
        rows={3}
        rowsMax={5}
      />
      <Switch errors={errors} label="Public tribe" name="public" />
    </>
  );
};

export default SummaryStep;
