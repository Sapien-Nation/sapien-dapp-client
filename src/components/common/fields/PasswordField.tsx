import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { validatePassword } from 'utils/passwordValidation';

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
            return validatePassword(value);
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
