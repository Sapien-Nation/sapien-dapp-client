/* istanbul ignore file */
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// next
import Link from 'next/link';

// api
import axios from 'api';

// mui
import { Box, Button, TextField, Typography } from '@material-ui/core';

enum View {
  Success,
}

interface Props {
  setView: (view: View) => void;
}

const Forgot = ({ setView }: Props) => {
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async () => {
    try {
      await axios.post('/api/users/forgot');
      setView(View.Success);
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginY="5rem">
        <Typography component="h1" variant="h2">
          Forgotten Password
        </Typography>
      </Box>
      <TextField
        fullWidth
        InputProps={{ ...register('email') }}
        autoComplete="email"
        label="Email, phone number, or username"
        placeholder="Enter your email, phone number, or username"
      />

      <Button fullWidth color="primary" type="submit" variant="contained">
        Send request
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem"
      >
        <>
          <Typography color="textPrimary" component="span" variant="subtitle2">
            Remembered your password?
          </Typography>
          <Link passHref href="/login">
            <Typography
              color="inherit"
              component="a"
              style={{
                marginLeft: '4px',
              }}
              variant="caption"
            >
              Log in
            </Typography>
          </Link>
        </>
      </Box>
    </form>
  );
};

export default Forgot;
