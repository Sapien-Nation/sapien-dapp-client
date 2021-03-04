import { ErrorMessage } from '@hookform/error-message';

// types
import type { CheckboxProps } from '@material-ui/core';
import type { FieldErrors } from 'react-hook-form';

// styles
import { purple } from 'styles/colors';

// mui
import {
  Checkbox as MUICheckbox,
  FormControlLabel,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {
      padding: '0',
      paddingRight: '6px',
      color: purple,
      '&$checked': {
        color: purple,
      },
    },
    checked: {},
    label: {
      display: 'flex',
    },
    controlLabel: {
      marginBottom: '1rem',
      marginLeft: '0',
    },
  });
});

interface Props extends CheckboxProps {
  errors: FieldErrors;
  label: React.ReactNode;
  name: string;
}
const Checkbox = ({ errors, name, label, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.controlLabel, label: classes.label }}
        control={
          <MUICheckbox
            classes={{ root: classes.root, checked: classes.checked }}
            color="default"
            name={name}
            {...rest}
          />
        }
        label={label}
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

export default Checkbox;
