// styles
import { red } from 'styles/colors';

// mui
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  error: () => ({
    color: red,
    fontSize: '1.2rem',
    display: 'flex',
    fontWeight: 600,
    justifyContent: 'flex-end'
  })
}));

const ErrorsType = {
  Required: 'required',
  MaxLength: 'maxLength',
  Min: 'min',
  Max: 'max',
  Pattern: 'pattern'
};

interface Props {
  type: string;
}

const FormErrors = ({ type }: Props) => {
  const classes = useStyles();

  let error = (() => {
    if (type === ErrorsType.Required) {
      return 'This is required';
    } else if (type === ErrorsType.MaxLength) {
      return 'Max length exceeded';
    } else if (type === ErrorsType.Min) {
      return 'Please enter more characters';
    } else if (type === ErrorsType.Max) {
      return 'Please enter less characters';
    } else if (type === ErrorsType.Pattern) {
      return 'Please enter a valid value';
    } else {
      return '';
    }
  })();

  return (
    <Typography
      classes={{
        root: classes.error
      }}
      role="alert"
      variant="subtitle2"
    >
      {error}
    </Typography>
  );
};

export default FormErrors;
