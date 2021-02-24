import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';

// styles
import { error, red } from 'styles/colors';

// mui
import {
  Box,
  Input as MuiInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  VisibilityOutlined as EyeOpen,
  VisibilityOffOutlined as EyeOff,
} from '@material-ui/icons';

//components
import ChartCount from 'components/form/ChartCount';

export interface Props extends InputProps {
  chartCount?: string;
  errors: FieldErrors;
  label: string;
  name: string;
  separation?: string;
}

const TextInput = ({
  chartCount,
  errors,
  label,
  name,
  separation = '2rem',
  style,
  type,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div style={{ marginBottom: separation }}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={1}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {chartCount && <ChartCount maxCount={chartCount} name={name} />}
      </Box>
      <MuiInput
        endAdornment={
          type === 'password' && (
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
          )
        }
        id={name}
        name={name}
        style={{
          ...style,
          backgroundColor: Object.keys(errors[name] || []).length
            ? error
            : style?.backgroundColor ?? null,
          borderColor: Object.keys(errors[name] || []).length
            ? red
            : style?.backgroundColor ?? null,
        }}
        type={getInputType()}
        {...rest}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Typography
            color="secondary"
            role="alert"
            style={{
              textAlign: 'right',
              fontSize: '1.2rem',
              fontWeight: 600,
              marginTop: '6px',
            }}
            variant="body1"
          >
            {message}
          </Typography>
        )}
      />
    </div>
  );
};

export default TextInput;
