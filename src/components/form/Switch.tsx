import { ErrorMessage } from '@hookform/error-message';

// types
import type { FieldErrors } from 'react-hook-form';
import type { SwitchProps } from '@material-ui/core';

// mui
import {
  Box,
  IconButton,
  InputLabel,
  Switch as MUISwitch,
  useTheme,
  Typography,
} from '@material-ui/core';
import { HelpOutlineOutlined as HelpIcon } from '@material-ui/icons';

export interface Props extends SwitchProps {
  errors?: FieldErrors;
  label: string;
  name: string;
}

const Switch = ({ errors, label, name, ...rest }: Props) => {
  const theme = useTheme();

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <InputLabel htmlFor={name}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box component="span">{label}</Box>
            <IconButton
              aria-label={name}
              style={{ color: theme.palette.infoIcon.main }}
            >
              <HelpIcon fontSize="small" />
            </IconButton>
          </Box>
        </InputLabel>
        <MUISwitch disableRipple color="default" name={name} {...rest} />
      </Box>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Typography
            color="secondary"
            role="alert"
            style={{
              textAlign: 'right',
            }}
            variant="subtitle1"
          >
            {message}
          </Typography>
        )}
      />
    </>
  );
};

export default Switch;
