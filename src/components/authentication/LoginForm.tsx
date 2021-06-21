import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// api
import { login as loginAction } from 'api/authentication';

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
  const { setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginAction({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/',
      });

      setSession({ torus: response.torus, token: response.token });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
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
          label={<Typography variant="subtitle2">Remember me</Typography>}
        />
        <Link href="/forgot-password">
          <a>
            <Typography color="primary" variant="subtitle2">
              Forgot password?
            </Typography>
          </a>
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
