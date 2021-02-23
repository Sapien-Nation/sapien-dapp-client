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
      color: purple,
      '&$checked': {
        color: purple,
      },
    },
    checked: {},
  });
});

interface Props extends CheckboxProps {
  errors: FieldErrors;
  label: string;
  name: string;
}
const Checkbox = ({ errors, name, label, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        control={
          <MUICheckbox
            classes={{ root: classes.root, checked: classes.checked }}
            color="default"
            name={name}
            {...rest}
          />
        }
        label={
          <Typography
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
            }}
          >
            {label}
          </Typography>
        }
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
            }}
            variant="body1"
          >
            {message}
          </Typography>
        )}
      />
    </>
  );
};

export default Checkbox;
