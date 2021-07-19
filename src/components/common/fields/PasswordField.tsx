import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// mui
import {
  BaseTextFieldProps,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

interface Props extends BaseTextFieldProps {
  errors: any;
  isConfirm?: boolean;
  name?: string;
  register: UseFormRegister<any>;
  watch?: (field: Array<string> | string) => Array<string> | string;
}

const PasswordField = ({
  errors = {},
  isConfirm = false,
  name = 'password',
  register,
  label,
  placeholder = 'mypassword123*',
  watch,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
      error={Boolean(errors[name])}
      helperText={
        <Box component="span" display="block" marginTop={0.5} textAlign="right">
          <ErrorMessage errors={errors} name={name} />
        </Box>
      }
      id={name}
      inputProps={{
        ...register(name, {
          validate: (value: string) => {
            if (!isConfirm && !/[a-z]/.test(value)) {
              return 'At least one lowercase letter.';
            }

            if (!isConfirm && !/[A-Z]/.test(value)) {
              return 'At least one uppercase letter.';
            }

            if (!isConfirm && !/[\d]/.test(value)) {
              return 'At least one number.';
            }

            if (!isConfirm && value?.length < 8) {
              return 'At least 8 characters.';
            }

            if (isConfirm && value !== watch('password')) {
              return 'Passwords don’t match';
            }

            return true;
          },
        }),
        autoComplete: 'new-password',
      }}
      label={label}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
    />
  );
};

export default PasswordField;
