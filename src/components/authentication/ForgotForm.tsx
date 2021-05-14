import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// next
import Link from 'next/link';

// mui
import { Box, Button, TextField, Typography } from '@material-ui/core';

interface Props {
  setView: () => void;
}

const Forgot = ({ setView }: Props) => {
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: any) => {
    try {
      // TO DO connect to new endpoint
      console.log(values);
      setView();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" style={{ margin: '5rem 0' }} variant="h2">
        Forgotten Password
      </Typography>
      <TextField
        fullWidth
        required
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
