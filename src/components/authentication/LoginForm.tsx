import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';

// mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar('An error occurred, please try again');
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        autoComplete="email"
        inputProps={{ ...register('email') }}
        label="Email, phone number, or username"
        placeholder="myemailaddress@email.com"
      />
      <TextField
        fullWidth
        required
        autoComplete="new-password"
        inputProps={{ ...register('password') }}
        label="Password"
        placeholder="mypassword123*"
        type="password"
      />
      <Box display="flex" justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" name="remember" />}
          label={<Typography variant="subtitle1">Remember me</Typography>}
        />
        <Link passHref href="/forgot">
          <Typography color="primary" component="a" variant="caption">
            Forgot password?
          </Typography>
        </Link>
      </Box>
      <Button fullWidth color="primary" type="submit" variant="contained">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
