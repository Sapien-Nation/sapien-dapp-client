import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';

// styles
import { purple } from 'styles/colors';

// api
import axios from 'api';

// components
import Dialog from 'components/dialog';
import { TextInput } from 'components/form';

interface Props {
  onClose: () => void;
}

const CreateSquare = ({ onClose }: Props) => {
  const methods = useForm();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values: { topic: string; name: string }) => {
    try {
      await axios.post('/api/squares/create', {
        name,
        topics: values.topic.split(' '),
      });
      onClose();
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
  const { ref: topicRef, ...topicRest } = register('topic', {
    required: 'Topic is required',
    validate: {
      maxLength: (val = '') => {
        const list = val.split(' ');
        const hash = list.filter((str) => str.startsWith('#'));
        return (
          list.length === hash.length ||
          'Please enter valid topics (start with #)'
        );
      },
    },
  });

  const form = 'create-square';
  return (
    <Dialog open form={form} maxWidth="sm" title="New Square" onClose={onClose}>
      <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
        <FormProvider {...methods}>
          <TextInput
            fullWidth
            autoComplete="name"
            chartCount="20"
            errors={errors}
            inputRef={nameRef}
            label="Name"
            placeholder="Name"
            {...nameRest}
          />
          <TextInput
            fullWidth
            autoComplete="topic"
            errors={errors}
            inputRef={topicRef}
            label="Topic"
            placeholder="Topic"
            style={{ color: purple }}
            {...topicRest}
          />
        </FormProvider>
      </form>
    </Dialog>
  );
};

export default CreateSquare;
