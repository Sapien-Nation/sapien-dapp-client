import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { ErrorMessage } from '@hookform/error-message';

// api
import { forgot } from 'api/authentication';

// mui
import { Box, Button, TextField } from '@material-ui/core';

// utils
import { EmailRegex } from 'utils/regex';

interface Props {
  changeView: () => void;
}

const Forgot = ({ changeView }: Props) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await forgot(email);

      changeView();
    } catch (error) {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        error={Boolean(errors.email)}
        helperText={
          <Box marginTop={1} textAlign="right">
            <ErrorMessage errors={errors} name="email" />
          </Box>
        }
        id="email"
        inputProps={{
          ...register('email', {
            pattern: {
              value: EmailRegex,
              message: 'Invalid email',
            },
            required: {
              value: true,
              message: 'Enter an email',
            },
          }),
          autoComplete: 'email',
        }}
        label="Email or username"
        placeholder="Enter your email, or username"
      />

      <Button
        fullWidth
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Send request
      </Button>
    </form>
  );
};

export default Forgot;
