/* istanbul ignore file */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// api
import axios from 'api';

// mui
import { Box, Button, CssBaseline, makeStyles } from '@material-ui/core';

// assets
import { FullLogo } from 'components/assets/svg';

// context
import { useAuth } from 'context/user';

// components
import { Forgot, Login, Signup } from 'components/auth';

enum View {
  Forgot,
  Login,
  Signup,
  Success,
}

const useStyles = makeStyles({
  image: {
    backgroundImage: 'url(static/auth.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const AuthPage = () => {
  const { asPath, events } = useRouter();
  const [view, setView] = useState(() => {
    if (asPath?.includes('#signup')) {
      return View.Signup;
    } else if (asPath?.includes('#login')) {
      return View.Login;
    } else {
      return View.Forgot;
    }
  });
  const { enqueueSnackbar } = useSnackbar();
  const { login, register } = useAuth();
  const methods = useForm();
  const classes = useStyles();

  const renderForm = () => {
    switch (view) {
      case View.Login:
        return <Login />;
      case View.Forgot:
        return <Forgot />;
      default:
        return <Signup />;
    }
  };

  events?.on('hashChangeComplete', (url) => {
    if (url.includes('#signup') && view !== View.Signup) {
      setView(View.Signup);
    } else if (url.includes('#login') && view !== View.Login) {
      setView(View.Login);
    } else if (url.includes('#forgot') && view !== View.Forgot) {
      setView(View.Forgot);
    }
  });

  const form = 'auth';

  const { handleSubmit } = methods;

  const forgotten = async () => {
    try {
      await axios.post('/api/users/forgot');
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const onSubmit = async () => {
    try {
      if (view === View.Login) {
        await login();
      } else if (view === View.Signup) {
        await register();
      } else if (view === View.Forgot) {
        await forgotten();
        setView(View.Success);
      }
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar('An error occurred, please try again');
    }
  };

  return (
    <>
      <CssBaseline />
      <div
        style={{
          display: 'grid',
          height: '100vh',
          gridTemplateColumns: '1fr 560px',
        }}
      >
        <Box className={classes.image}></Box>
        <Box alignItems="center" display="flex" justifyContent="center">
          <Box
            display="flex"
            flexDirection="column"
            margin="5rem 0"
            width="39rem"
          >
            <FullLogo />
            {view === View.Success ? (
              <Link href="/auth#login">
                <Button>Back to Login</Button>
              </Link>
            ) : (
              <FormProvider {...methods}>
                <form id={form} onSubmit={handleSubmit(onSubmit)}>
                  {renderForm()}
                </form>
              </FormProvider>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AuthPage;
