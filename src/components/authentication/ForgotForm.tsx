import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// next
import Link from 'next/link';

// api
import axios from 'api';

// mui
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

//components
import { TextInput } from 'components/common';

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
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
        <Box marginTop={2} textAlign="center">
          <Box marginBottom={4}>
            <Typography variant="h2">Request sent successfully</Typography>
          </Box>
          <Box marginBottom={4}>
            <Typography variant="h4">
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
              style={{
                cursor: 'pointer',
              }}
              variant="subtitle2"
            >
              Haven’t received an email?
            </Typography>
            <Button
              classes={{ root: classes.buttonLink }}
              onClick={() => setView(View.Form)}
            >
              <Typography
                style={{
                  cursor: 'pointer',
                  marginLeft: '4px',
                }}
                variant="subtitle1"
              >
                Resend
              </Typography>
            </Button>
          </Box>
        </Box>
      ) : (
        <form id="forgot-form" onSubmit={handleSubmit(onSubmit)}>
          <Box marginY="5rem">
            <Typography variant="h1">Forgotten Password</Typography>
          </Box>
          <TextInput
            fullWidth
            autoComplete="email"
            errors={errors}
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
              <Typography color="textPrimary" variant="subtitle2">
                Remembered your password?
              </Typography>
              <Link href="/login">
                <Typography
                  style={{
                    cursor: 'pointer',
                    marginLeft: '4px',
                  }}
                  variant="subtitle1"
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
