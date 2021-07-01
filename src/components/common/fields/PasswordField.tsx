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
  name?: string;
  register: UseFormRegister<any>;
  shouldValidate?: boolean;
}

const PasswordField = ({
  errors = {},
  name = 'password',
  register,
  label,
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
      error={Boolean(errors.password)}
      helperText={
        <Box component="span" display="block" marginTop={0.5} textAlign="right">
          <ErrorMessage errors={errors} name={name} />
        </Box>
      }
      id={name}
      inputProps={{
        ...register(name, {
          required: {
            value: true,
            message: 'Enter a password',
          },
          validate: (value: string) => {
            if (!/[a-zA-Z]/.test(value)) {
              return 'At least one alphabet is required.';
            }

            if (!/[a-z]/.test(value)) {
              return 'At least one lowercase letter is required.';
            }

            if (!/[A-Z]/.test(value)) {
              return 'At least one uppercase letter is required.';
            }

            if (!/[\d]/.test(value)) {
              return 'At least one number is required.';
            }

            if (value?.length < 8) {
              return 'Minimum 8 characters required.';
            }
          },
        }),
        autoComplete: 'new-password',
      }}
      label={label}
      placeholder="mypassword123*"
      type={showPassword ? 'text' : 'password'}
    />
  );
};

export default PasswordField;
