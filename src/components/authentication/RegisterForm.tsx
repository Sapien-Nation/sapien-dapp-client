import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// api
import { register as registerAction } from 'api/authentication';

// assets
import {
  Checkbox as CheckboxIcon,
  CheckboxChecked as CheckboxCheckedIcon,
} from 'assets';

// context
import { useAuth } from 'context/user';

// components
import { ChartCount } from 'components/common';

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
  Tooltip,
} from '@material-ui/core';
import {
  Info as InfoIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

// utils
import {
  EmailRegex,
  NameRegex,
  UsernameRegex,
  PasswordRegex,
} from 'utils/regex';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (values: {
    displayName: string;
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const response = await registerAction({
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

  console.log(errors);
  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        id="email"
        inputProps={{
          ...register('email', {
            pattern: {
              value: EmailRegex,
              message: 'Invalid email',
            },
            required: {
              value: true,
              message: 'Enter an email',
            },
          }),
          autoComplete: 'email',
        }}
        label="Email"
        placeholder="myemailaddress@email.com"
        type="email"
      />
      <TextField
        fullWidth
        id="username"
        inputProps={{
          ...register('username', {
            pattern: {
              value: UsernameRegex,
              message: 'Invalid email',
            },
            required: {
              value: true,
              message: 'Enter a username',
            },
          }),
          autoComplete: 'username',
        }}
        label={
          <Box display="flex" justifyContent="space-between">
            Username
            <ChartCount control={control} maxCount={20} name="username" />
          </Box>
        }
        placeholder="johndoe"
        type="text"
      />
      <TextField
        fullWidth
        id="displayName"
        inputProps={{
          autoComplete: 'name',
          ...register('displayName', {
            pattern: {
              value: NameRegex,
              message: 'Invalid name',
            },
            required: {
              value: true,
              message: 'Enter a name',
            },
          }),
        }}
        label={
          <Box display="flex" justifyContent="space-between">
            Name
            <ChartCount control={control} maxCount={20} name="displayName" />
          </Box>
        }
        placeholder="Jonathan Doe"
        type="text"
      />
      <TextField
        fullWidth
        InputLabelProps={{
          style: { pointerEvents: 'auto' },
        }}
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
            pattern: {
              value: PasswordRegex,
              message: 'Invalid password',
            },
            required: {
              value: true,
              message: 'Enter a password',
            },
          }),
          autoComplete: 'new-password',
        }}
        label={
          <Box alignItems="center" display="flex">
            Password{' '}
            <Tooltip
              arrow
              placement="right"
              title="Minimum length is 8 characters. Must include at least 1 alpha, 1 numeric, 1 lowercaps, and 1 highercaps."
            >
              <InfoIcon fontSize="small" style={{ marginLeft: '0.5rem' }} />
            </Tooltip>
          </Box>
        }
        placeholder="mypassword123*"
        type={showPassword ? 'text' : 'password'}
      />
      <TextField
        fullWidth
        InputLabelProps={{
          style: { pointerEvents: 'auto' },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        id="confirmPassword"
        inputProps={{
          ...register('confirmPassword', {
            required: {
              value: true,
              message: 'Enter a password',
            },
            validate: (value) =>
              value === watch('password') || "Passwords don't match.",
          }),
          autoComplete: 'new-password',
        }}
        label="Confirm Password"
        placeholder="Repeat Password"
        type={showRepeatPassword ? 'text' : 'password'}
      />
      <Box marginBottom="2rem">
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              checkedIcon={<CheckboxCheckedIcon />}
              color="default"
              icon={<CheckboxIcon />}
              name="agree"
            />
          }
          label={
            <Typography>
              <Typography component="span" variant="subtitle2">
                I have read and agree to the
              </Typography>{' '}
              <Typography component="span" variant="subtitle2">
                <a
                  href="https://common.sapien.network/terms.html"
                  rel="noreferrer"
                  style={{ color: '#42D1E0' }}
                  target="_blank"
                >
                  Terms & Conditions
                </a>
              </Typography>
            </Typography>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              disableRipple
              required
              checkedIcon={<CheckboxCheckedIcon />}
              color="default"
              icon={<CheckboxIcon />}
              name="wallet"
            />
          }
          label={
            <Typography variant="subtitle2">
              I understand that a wallet will be created for me
            </Typography>
          }
        />
      </Box>

      <Button
        fullWidth
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
