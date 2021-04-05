import { useFormContext } from 'react-hook-form';

//components
import { TextInput } from 'components/form';

const SummaryStep = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const { ref: nameRef, ...nameRest } = register('name', {
    required: 'Name is required',
    validate: {
      maxLength: (val = '') => val.length <= 36 || 'name is to long',
    },
  });
  const { ref: descriptionRef, ...descriptionRest } = register('description', {
    required: 'Description is required',
    validate: {
      maxLength: (val = '') => val.length <= 60 || 'description is to long',
    },
  });

  return (
    <>
      <TextInput
        fullWidth
        autoComplete="name"
        chartCount="36"
        errors={errors}
        inputRef={nameRef}
        label="Name"
        placeholder="Name"
        {...nameRest}
      />
      <TextInput
        fullWidth
        multiline
        autoComplete="description"
        chartCount="60"
        errors={errors}
        inputRef={descriptionRef}
        label="Description"
        placeholder="Description"
        rows={3}
        rowsMax={5}
        {...descriptionRest}
      />
    </>
  );
};

export default SummaryStep;
