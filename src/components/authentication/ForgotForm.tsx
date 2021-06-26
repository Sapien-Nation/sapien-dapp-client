import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// api
import { forgot } from 'api/authentication';

// mui
import { Button, TextField } from '@material-ui/core';

interface Props {
  changeView: () => void;
}

const Forgot = ({ changeView }: Props) => {
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await forgot(email);

      changeView();
    } catch (error) {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        id="email"
        inputProps={{ ...register('email'), autoComplete: 'email' }}
        label="Email, phone number, or username"
        placeholder="Enter your email, phone number, or username"
        type="email"
      />

      <Button fullWidth color="primary" type="submit" variant="contained">
        Send request
      </Button>
    </form>
  );
};

export default Forgot;
