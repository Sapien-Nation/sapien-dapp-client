import { useFormContext } from 'react-hook-form';

//components
import { TextInput } from 'components/common';

const SummaryStep = () => {
  const {
    formState: { errors },
    register,
    watch,
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

  const currentName = watch('name');
  const currentDescription = watch('description');

  return (
    <>
      <TextInput
        fullWidth
        autoComplete="name"
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
        multiline
        autoComplete="description"
        chartCount="60"
        currentChartCount={currentDescription?.length}
        errors={errors}
        inputRef={descriptionRef}
        label="Description"
        maxRows={5}
        minRows={3}
        placeholder="Description"
        {...descriptionRest}
      />
    </>
  );
};

export default SummaryStep;
