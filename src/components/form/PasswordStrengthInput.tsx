import { useState } from 'react';

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
  Tooltip as MUITooltip,
  withStyles,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import {
  VisibilityOutlined as EyeOpen,
  VisibilityOffOutlined as EyeOff,
  HelpOutlineOutlined as Help,
} from '@material-ui/icons';

// styles
import { darkGrey, green, orange, outline, red, white } from 'styles/colors';

export interface Props extends InputProps {
  errors: FieldErrors;
  label: string;
  name: string;
  tooltipText?: string;
}

const Tooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: white,
    maxWidth: 320,
    boxShadow: `2px 3px 2px 2px ${darkGrey}`,
  },
}))(MUITooltip);

const PasswordStrengthInput = ({
  errors,
  label,
  name,
  tooltipText = '',
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const type = errors[name]?.type;

  const { color, points, text } = (() => {
    let color;
    let points = 0;
    let text = '';
    switch (type) {
      case undefined:
        color = outline;
        break;
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
    <div>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        marginBottom={1}
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        {tooltipText && (
          <Tooltip interactive title={<Typography>{tooltipText}</Typography>}>
            <Help color="primary" fontSize="small" style={{ marginLeft: 5 }} />
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
          color,
          textAlign: 'right',
          fontSize: '1.2rem',
          fontWeight: 600,
        }}
        variant="body1"
      >
        {text}
      </Typography>
    </div>
  );
};

export default PasswordStrengthInput;
