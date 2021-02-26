import { useFormContext } from 'react-hook-form';

//components
import { TextInput } from 'components/form';

const SummaryStep = () => {
  const { errors, register } = useFormContext();
  return (
    <>
      <TextInput
        fullWidth
        autoComplete="name"
        chartCount="36"
        errors={errors}
        inputRef={register({ required: 'Name is required', maxLength: 36 })}
        label="Name"
        name="name"
        placeholder="Name"
      />
      <TextInput
        fullWidth
        multiline
        autoComplete="description"
        chartCount="60"
        errors={errors}
        inputRef={register({
          required: 'Description is required',
          maxLength: 60,
        })}
        label="Description"
        name="description"
        placeholder="Description"
        rows={3}
        rowsMax={5}
      />
    </>
  );
};

export default SummaryStep;
