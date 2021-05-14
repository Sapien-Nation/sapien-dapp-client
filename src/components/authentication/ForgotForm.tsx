/* istanbul ignore file */
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// next
import Link from 'next/link';

// api
import axios from 'api';

// mui
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  buttonLink: {
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  successButton: {
    minWidth: '14rem',
    minHeight: '4.6rem',
  },
});

enum View {
  Form,
  Success,
}
const Forgot = () => {
  const [view, setView] = useState(View.Form);
  const { handleSubmit, register } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { ref, ...rest } = register('username', {
    required: 'Email is required',
  });

  const onSubmit = async () => {
    try {
      await axios.post('/api/users/forgot');
      setView(View.Success);
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <>
      {view === View.Success ? (
        <Box marginTop={4} textAlign="center">
          <Box marginBottom={4}>
            <Typography component="h1" variant="h2">
              Request sent successfully
            </Typography>
          </Box>
          <Box marginBottom={4}>
            <Typography variant="body2">
              If the email and username provided match, you will receive
              instructions to set a new password shortly.
            </Typography>
          </Box>
          <Link href="/login">
            <Button
              classes={{ root: classes.successButton }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Got it!
            </Button>
          </Link>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            marginTop="2rem"
          >
            <Typography
              color="textPrimary"
              component="span"
              variant="subtitle2"
            >
              Haven’t received an email?
            </Typography>
            <Button
              classes={{ root: classes.buttonLink }}
              color="inherit"
              onClick={() => setView(View.Form)}
            >
              <Typography
                component="a"
                style={{
                  marginLeft: '4px',
                }}
                variant="caption"
              >
                Resend
              </Typography>
            </Button>
          </Box>
        </Box>
      ) : (
        <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
          <Box marginY="5rem">
            <Typography component="h1" variant="h2">
              Forgotten Password
            </Typography>
          </Box>
          <TextField
            fullWidth
            autoComplete="email"
            inputRef={ref}
            label="Email, phone number, or username"
            placeholder="Enter your email, phone number, or username"
            {...rest}
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
              <Typography
                color="textPrimary"
                component="span"
                variant="subtitle2"
              >
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
      )}
    </>
  );
};

export default Forgot;
