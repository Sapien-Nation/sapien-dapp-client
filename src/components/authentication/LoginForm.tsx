import Link from 'next/link';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// api
import { login as loginAction } from 'api/authentication';

// context
import { useAuth } from 'context/user';

// mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// utils
import { EmailRegex } from 'utils/regex';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginAction({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/',
      });

      setSession({ torus: response.torus, token: response.token });
    } catch (error) {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  // TODO show errors
  console.log(errors);

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        error={Boolean(errors.email)}
        helperText={
          <Box marginTop={1} textAlign="right">
            <ErrorMessage errors={errors} name="email" />
          </Box>
        }
        id="email"
        inputProps={{
          ...register('email', {
            pattern: {
              value: EmailRegex,
              message: 'Invalid email',
            },
            required: {
              value: true,
              message: 'Enter an email address!',
            },
          }),
          autoComplete: 'email',
        }}
        label="Email or username"
        placeholder="myemailaddress@email.com"
        type="email"
      />
      <TextField
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        id="password"
        inputProps={{
          ...register('password', {
            required: {
              value: true,
              message: 'Enter a password',
            },
          }),
          autoComplete: 'new-password',
        }}
        label="Password"
        placeholder="mypassword123*"
        style={{ marginBottom: '1rem' }}
        type={showPassword ? 'text' : 'password'}
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Controller
          control={control}
          defaultValue={true}
          name="remember"
          render={({ field: { value, ...rest } }) => (
            <FormControlLabel
              control={
                <Checkbox checked={Boolean(value)} color="default" {...rest} />
              }
              label={<Typography variant="subtitle2">Remember me</Typography>}
            />
          )}
        />
        <Link href="/change-password">
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
