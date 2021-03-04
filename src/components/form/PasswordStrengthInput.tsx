import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';

// mui
import {
  Box,
  Input as MuiInput,
  InputAdornment,
  InputLabel,
  IconButton,
  LinearProgress,
  Typography,
} from '@material-ui/core';

import {
  VisibilityOutlined as EyeOpen,
  VisibilityOffOutlined as EyeOff,
  ErrorOutline as Help,
} from '@material-ui/icons';

// styles
import { green, orange, outline, red, lightGrey } from 'styles/colors';

// components
import Tooltip from 'components/form/Tooltip';

export interface Props extends InputProps {
  errors: FieldErrors;
  label: string;
  name: string;
  tooltipText?: string;
}

const PasswordStrengthInput = ({
  errors,
  label,
  name,
  tooltipText = '',
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, unregister, watch, setValue } = useFormContext();
  const password = watch(name);

  useEffect(() => {
    register(name, {
      validate: {
        required: (value = '') => value.length || 'Weak',
        noWords: (value = '') => /\W/.test(value) || 'Weak',
        upperCase: (value = '') => /[A-Z]/.test(value) || 'Medium',
        lowerCase: (value = '') => /[a-z]/.test(value) || 'Medium',
        digitCase: (value = '') => /\d/.test(value) || 'Medium',
      },
    });
    return () => unregister(name);
  }, [name, register, unregister]);

  const type = errors[name]?.type;

  const { color, points, text } = (() => {
    let color;
    let points = 0;
    let text = '';

    if (type === undefined && !password) {
      return { color: '', points: 0, text: '' };
    }
    switch (type) {
      case 'required':
        color = red;
        points = 0;
        text = 'Type Something';
        break;
      case 'noWords':
        color = red;
        points = 25;
        text = 'Keep going';
        break;
      case 'lowerCase':
      case 'upperCase':
        color = orange;
        points = 50;
        text = 'Almost';
        break;
      case 'digitCase':
        color = orange;
        points = 75;
        text = 'Going Well';
        break;
      case undefined:
        color = green;
        points = 100;
        text = 'Nice Password!';
        break;
    }
    return { color, points, text };
  })();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        marginBottom={1}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {tooltipText && (
          <Tooltip interactive title={<Typography>{tooltipText}</Typography>}>
            <Help
              fontSize="small"
              style={{ marginLeft: 5, color: lightGrey }}
            />
          </Tooltip>
        )}
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
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        onChange={(event) =>
          setValue(name, event.target.value, { shouldValidate: true })
        }
        {...rest}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          marginTop: 4,
        }}
      >
        <LinearProgress
          color="primary"
          style={{ backgroundColor: points >= 25 ? color : outline }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          color="primary"
          style={{ backgroundColor: points >= 50 ? color : outline }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          color="primary"
          style={{ backgroundColor: points >= 75 ? color : outline }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          color="primary"
          style={{ backgroundColor: points >= 100 ? color : outline }}
          value={0}
          variant="determinate"
        />
      </div>
      <Typography
        color="secondary"
        role="alert"
        style={{
          textAlign: 'right',
        }}
        variant="subtitle1"
      >
        {text}
      </Typography>
    </div>
  );
};

export default PasswordStrengthInput;
