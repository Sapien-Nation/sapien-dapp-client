import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// types
import { Square } from 'tools/types/square';

// styles
import { purple } from 'styles/colors';

// components
import { TextInput } from 'components/form';

export interface FormValues {
  topics: string;
  name: string;
}

interface Props {
  action: (values: FormValues) => Promise<any>;
  square?: Square;
}

export const formKey = 'square-form';

const SquareForm = ({ action, square }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      name: square?.name ?? '',
      topics: square?.topics.join(' ') ?? '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values: FormValues) => {
    try {
      await action(values);
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: 'Name is required',
    validate: {
      maxLength: (val = '') => val.length <= 20 || 'name is to long',
    },
  });
  const { ref: topicsRef, ...topicsRest } = register('topics', {
    required: 'Topic is required',
    validate: {
      maxLength: (val = '') => {
        const list = (val as string).split(' ');
        const hash = list.filter((str) => str.startsWith('#'));
        return list.length === hash.length || 'Topic should start with #';
      },
    },
  });

  const currentNameVal = watch('name');
  const currentTopicVal = watch('topics');

  return (
    <form id={formKey} onSubmit={handleSubmit(handleFormSubmit)}>
      <TextInput
        fullWidth
        autoComplete="name"
        chartCount="20"
        currentChartCount={currentNameVal?.length}
        errors={errors}
        inputRef={nameRef}
        label="Name"
        placeholder="Name"
        {...nameRest}
      />
      <TextInput
        fullWidth
        autoComplete="topics"
        currentChartCount={currentTopicVal?.length}
        errors={errors}
        inputRef={topicsRef}
        label="Topics"
        placeholder="Topics"
        style={{ color: purple }}
        {...topicsRest}
      />
    </form>
  );
};

export default SquareForm;
