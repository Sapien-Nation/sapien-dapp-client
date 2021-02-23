import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// mui
import {
  Box,
  FormControl,
  Input as MuiInput,
  InputAdornment,
  InputLabel,
  IconButton,
  Tooltip as MUITooltip,
  withStyles,
  LinearProgress,
  Typography
} from '@material-ui/core';
import {
  VisibilityOutlined as EyeOpen,
  VisibilityOffOutlined as EyeOff,
  HelpOutlineOutlined as Help
} from '@material-ui/icons';

// styles
import { darkGrey, green, orange, outline, red, white } from 'styles/colors';

export interface Props {
  fullWidth?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  tooltipText?: string;
}

const Tooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: white,
    maxWidth: 320,
    boxShadow: `2px 3px 2px 2px ${darkGrey}`
  }
}))(MUITooltip);

const PasswordStrengthInput = ({
  fullWidth = true,
  label,
  name,
  placeholder,
  tooltipText = ''
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, unregister, setValue, watch } = useFormContext();

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const password = watch(name);

  const passwordScore = (() => {
    let score = 0;
    if (password?.length) score += 1;
    if (password?.length >= 8) {
      score += 1;
      if (password.match(/\d/)) score += 1;
      if (password.match(/[a-z]/)) score += 1;
      if (password.match(/[A-Z]/)) score += 1;
    }

    return score;
  })();

  const getLabelText = () => {
    let label = '';
    let color = outline;

    switch (passwordScore) {
      case 1:
        label = 'Bad';
        color = red;
        break;
      case 2:
        label = 'Weak';
        color = orange;
        break;
      case 3:
      case 4:
        label = 'Medium';
        color = orange;
        break;
      case 5:
        label = 'Strong';
        color = green;
        break;
      default:
        break;
    }

    return (
      <Typography role="alert" style={{ textAlign: 'end', color }} variant="body1">
        {label}
      </Typography>
    );
  };

  return (
    <Box marginBottom={2}>
      <FormControl fullWidth={fullWidth}>
        <Box alignItems="center" display="flex" flexDirection="row" marginBottom={1}>
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
          fullWidth={fullWidth}
          id={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setValue(name, event.target.value, { shouldValidate: false })}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 3,
            marginTop: 4
          }}
        >
          <LinearProgress
            style={{ backgroundColor: passwordScore >= 1 ? red : outline }}
            value={0}
            variant="determinate"
          />
          <LinearProgress
            style={{
              backgroundColor: passwordScore >= 2 ? orange : outline
            }}
            value={0}
            variant="determinate"
          />
          <LinearProgress
            style={{
              backgroundColor: passwordScore >= 3 ? orange : outline
            }}
            value={0}
            variant="determinate"
          />
          <LinearProgress
            style={{ backgroundColor: passwordScore === 5 ? green : outline }}
            value={0}
            variant="determinate"
          />
        </div>
      </FormControl>
      {getLabelText()}
    </Box>
  );
};

export default PasswordStrengthInput;
