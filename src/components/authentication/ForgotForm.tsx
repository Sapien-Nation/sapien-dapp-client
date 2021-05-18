import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// mui
import { Button, TextField } from '@material-ui/core';

interface Props {
  changeView: () => void;
}

const Forgot = ({ changeView }: Props) => {
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: any) => {
    try {
      // TO DO connect to new endpoint
      console.log(values);
      changeView();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        InputProps={{ ...register('email') }}
        autoComplete="email"
        label="Email, phone number, or username"
        placeholder="Enter your email, phone number, or username"
      />

      <Button fullWidth color="primary" type="submit" variant="contained">
        Send request
      </Button>
    </form>
  );
};

export default Forgot;
