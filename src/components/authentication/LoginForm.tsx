import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// context
import { useAuth } from 'context/user';

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
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/',
      });
    } catch (error) {
      Sentry.captureException(error);
      enqueueSnackbar(error);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        id="email"
        inputProps={{ ...register('email'), autoComplete: 'email' }}
        label="Email, phone number, or username"
        placeholder="myemailaddress@email.com"
        type="email"
      />
      <TextField
        fullWidth
        required
        id="password"
        inputProps={{ ...register('password'), autoComplete: 'new-password' }}
        label="Password"
        placeholder="mypassword123*"
        style={{ marginBottom: '1rem' }}
        type="password"
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom={2}
      >
        <FormControlLabel
          control={<Checkbox defaultChecked color="default" name="remember" />}
          label={<Typography variant="buttonSmall">Remember me</Typography>}
        />
        <Link passHref href="/forgot">
          <Typography color="primary" component="a" variant="caption">
            Forgot password?
          </Typography>
        </Link>
      </Box>
      <Button
        fullWidth
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
