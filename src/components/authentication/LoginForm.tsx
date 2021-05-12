import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

//components
import { TextInput, Checkbox } from 'components/common';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const login = () => {};
  const { enqueueSnackbar } = useSnackbar();

  const { ref: usernameRef, ...restUsername } = register('username', {
    required: 'Email is required',
  });

  const { ref: passwordRef, ...restPassword } = register('password', {
    required: 'Password is required',
    maxLength: 36,
  });

  const onSubmit = async () => {
    try {
      await login();
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar('An error occurred, please try again');
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginY="5rem">
        <Typography variant="h1">Log in</Typography>
      </Box>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={usernameRef}
        label="Email, phone number, or username"
        placeholder="myemailaddress@email.com"
        {...restUsername}
      />
      <TextInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        inputRef={passwordRef}
        label="Password"
        placeholder="mypassword123*"
        spacing="6px"
        type="password"
        {...restPassword}
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom="2rem"
      >
        <Checkbox
          errors={errors}
          label={<Typography variant="subtitle1">Remember me</Typography>}
          name="remember"
        />
        <Link passHref href="/forgot">
          <Typography color="primary" variant="h4">
            Forgot password?
          </Typography>
        </Link>
      </Box>

      <Button fullWidth color="primary" type="submit" variant="contained">
        Log In
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem"
      >
        <>
          <Typography variant="subtitle2">Don’t have an account?</Typography>
          <Link href="/register">
            <Typography
              style={{
                cursor: 'pointer',
                marginLeft: '4px',
              }}
              variant="subtitle1"
            >
              Sign up
            </Typography>
          </Link>
        </>
      </Box>
    </form>
  );
};

export default Login;
