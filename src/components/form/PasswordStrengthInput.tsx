import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// types
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
  label,
  name,
  tooltipText = '',
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorState = undefined;

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
      {/* <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          marginTop: 4,
        }}
      >
        <LinearProgress
          style={{ backgroundColor: passwordScore >= 1 ? red : outline }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          style={{
            backgroundColor: passwordScore >= 2 ? orange : outline,
          }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          style={{
            backgroundColor: passwordScore >= 3 ? orange : outline,
          }}
          value={0}
          variant="determinate"
        />
        <LinearProgress
          style={{ backgroundColor: passwordScore === 5 ? green : outline }}
          value={0}
          variant="determinate"
        />
      </div>*/}
      {/* <FormErrors message={errorState?.message ?? 'Strong'} type={errorState?.type ?? ''} /> */}
    </div>
  );
};

export default PasswordStrengthInput;
