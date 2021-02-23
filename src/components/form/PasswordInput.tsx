import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// types
import type { InputProps } from '@material-ui/core';

// styles
import { red, error } from 'styles/colors';

// mui
import {
  Box,
  FormControl,
  Input as MuiInput,
  InputAdornment,
  InputLabel,
  IconButton
} from '@material-ui/core';
import {
  VisibilityOutlined as EyeOpen,
  VisibilityOffOutlined as EyeOff
} from '@material-ui/icons';

// components
import FormErrors from 'components/form/FormErrors';
export interface Props extends InputProps {
  fullWidth?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const PasswordStrengthInput = ({
  fullWidth = true,
  label,
  name,
  onChange,
  placeholder
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors }
  } = useFormContext();
  const errorState = errors[name];
  console.log(errorState);
  return (
    <>
      <FormControl fullWidth={fullWidth}>
        <Box alignItems="center" display="flex" flexDirection="row" marginBottom={1}>
          <InputLabel htmlFor={name}>{label}</InputLabel>
        </Box>
        <MuiInput
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
                  event.preventDefault()
                }
              >
                {showPassword ? <EyeOpen /> : <EyeOff />}
              </IconButton>
            </InputAdornment>
          }
          fullWidth={fullWidth}
          id={name}
          name={name}
          placeholder={placeholder}
          style={{
            backgroundColor: Object.keys(errorState || []).length ? error : null,
            borderColor: Object.keys(errorState || []).length ? red : null
          }}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
        />
      </FormControl>
      <FormErrors type={errorState?.type ?? ''} />
    </>
  );
};

export default PasswordStrengthInput;
