import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

// api
import { changePassword as changePasswordAction } from 'api/authentication';

// mui
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// utils
import { PasswordRegex } from 'utils/regex';

interface Props {
  changeView: () => void;
  token: string;
}

const ChangePassword = ({ changeView, token }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      await changePasswordAction({ password, token });
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
    <form id="change-password-form" onSubmit={handleSubmit(onSubmit)}>
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
        error={Boolean(errors.password)}
        helperText={
          <Box component="span" display="block" marginTop={1} textAlign="right">
            <ErrorMessage errors={errors} name="password" />
          </Box>
        }
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
        label="Password"
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
        error={Boolean(errors.confirmPassword)}
        helperText={
          <Box component="span" display="block" marginTop={1} textAlign="right">
            <ErrorMessage errors={errors} name="confirmPassword" />
          </Box>
        }
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

      <Button
        fullWidth
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Send request
      </Button>
    </form>
  );
};

export default ChangePassword;
