// styles
import { red } from 'styles/colors';

// mui
import { makeStyles, Typography } from '@material-ui/core';

enum ErrorsType {
  Required = 'required',
  MaxLength = 'maxLength',
  Min = 'min',
  Max = 'max',
  Pattern = 'pattern'
}

const FormErrors = ({ name }: { name: string }) => {
  const useStyles = makeStyles(() => ({
    error: () => ({
      color: red,
      fontSize: '1.2rem',
      display: 'flex',
      fontWeight: 600,
      justifyContent: 'flex-end'
    })
  }));
  const classes = useStyles();
  switch (name) {
    case ErrorsType.Required:
      return (
        <Typography
          classes={{
            root: classes.error
          }}
          role="alert"
          variant="subtitle2"
        >
          This is required
        </Typography>
      );
    case ErrorsType.MaxLength:
      return (
        <Typography
          classes={{
            root: classes.error
          }}
          role="alert"
          variant="subtitle2"
        >
          Max length exceeded
        </Typography>
      );
    case ErrorsType.Min:
      return (
        <Typography
          classes={{
            root: classes.error
          }}
          role="alert"
          variant="subtitle2"
        >
          Should be greatter than 0
        </Typography>
      );
    case ErrorsType.Max:
      return (
        <Typography
          classes={{
            root: classes.error
          }}
          role="alert"
          variant="subtitle2"
        >
          Should be lower than 100
        </Typography>
      );
    case ErrorsType.Pattern:
      return (
        <Typography
          classes={{
            root: classes.error
          }}
          role="alert"
          variant="subtitle2"
        >
          Should be valid email
        </Typography>
      );
    default:
      return null;
  }
};

export default FormErrors;
