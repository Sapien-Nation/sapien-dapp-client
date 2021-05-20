import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// mui
import {
  Button,
  TextField,
  Typography,
  FormHelperText,
} from '@material-ui/core';

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
        InputLabelProps={{ style: { pointerEvents: 'auto' } }}
        InputProps={{ ...register('password'), autoComplete: 'password' }}
        autoComplete="password"
        label={
          <>
            <Typography variant="buttonMedium">Password*</Typography>
            <FormHelperText style={{ margin: 0 }}>
              Minimum length is 8 characters. Must include at least 1 alpha, 1{' '}
              <br />
              numeric, 1 lowercaps, and 1 highercaps.
            </FormHelperText>
          </>
        }
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
