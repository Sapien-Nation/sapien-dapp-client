import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// mui
import { Button, TextField } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

interface Props {
  changeView: () => void;
  token: string;
}

const Forgot = ({ changeView, token }: Props) => {
  const { changePassword } = useAuth();
  const { getValues, handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      const repeatPassword = getValues('repeatPassword');
      if (repeatPassword !== password) {
        return enqueueSnackbar('Password dont match', {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      }
      await changePassword({ password, token });
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
        InputProps={{ ...register('password'), autoComplete: 'password' }}
        autoComplete="password"
        label="Password"
        placeholder="New Password"
        type="password"
      />

      <TextField
        fullWidth
        required
        InputProps={{
          ...register('repeatPassword'),
          autoComplete: 'repat-password',
        }}
        autoComplete="repeat-password"
        id="repeat-password"
        label="Repeat Password"
        placeholder="Repeat Password"
        type="password"
      />

      <Button fullWidth color="primary" type="submit" variant="contained">
        Send request
      </Button>
    </form>
  );
};

export default Forgot;
