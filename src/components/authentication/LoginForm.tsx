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
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Info as InfoIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

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
        redirect: '/client/sapien',
      });

      setSession({
        torus: response.torus,
        token: response.token,
        refresh: response.refresh,
      });
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again.', {
        variant: 'error',
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
        error={Boolean(errors.email)}
        helperText={
          <Box
            component="span"
            display="block"
            marginTop={0.5}
            textAlign="right"
          >
            <ErrorMessage errors={errors} name="email" />
          </Box>
        }
        id="email"
        inputProps={{
          ...register('email', {
            pattern: {
              value: EmailRegex,
              message: '',
            },
            required: {
              value: true,
              message: '',
            },
          }),
          autoComplete: 'email',
        }}
        label="Email"
        placeholder="myemailaddress@email.com"
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
        error={Boolean(errors.password)}
        helperText={
          <Box
            component="span"
            display="block"
            marginTop={0.5}
            textAlign="right"
          >
            <ErrorMessage errors={errors} name="password" />
          </Box>
        }
        id="password"
        inputProps={{
          ...register('password', {
            required: {
              value: true,
              message: '',
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
                <Checkbox checked={Boolean(value)} color="primary" {...rest} />
              }
              label={
                <Box alignItems="center" display="flex">
                  <Typography variant="overline">Remember me</Typography>
                  <Tooltip
                    arrow
                    color="primary"
                    placement="right"
                    title={
                      <Box>
                        Please only select this when using your own personal
                        device
                      </Box>
                    }
                  >
                    <InfoIcon
                      fontSize="small"
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </Tooltip>
                </Box>
              }
            />
          )}
        />
        <Link href="/change-password">
          <a>
            <Typography color="primary" variant="overline">
              Forgot password?
            </Typography>
          </a>
        </Link>
      </Box>
      <Button
        fullWidth
        aria-label="Login to Sapien"
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
