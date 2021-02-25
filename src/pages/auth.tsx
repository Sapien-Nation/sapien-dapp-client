/* istanbul ignore file */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as Sentry from '@sentry/node';

// next
import { useRouter } from 'next/router';

// mui
import { Box, CssBaseline, makeStyles } from '@material-ui/core';

// assets
import { FullLogo } from 'components/assets/svg';

// context
import { useAuth } from 'context/user';

// components
import { Login, Signup } from 'components/auth';

enum View {
  Login,
  Signup,
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
    return asPath?.includes('#signup') ? View.Signup : View.Login;
  });
  const { enqueueSnackbar } = useSnackbar();
  const { login, register } = useAuth();
  const methods = useForm();
  const classes = useStyles();

  const renderView = () => {
    switch (view) {
      case View.Login:
        return <Login />;
      default:
        return <Signup />;
    }
  };

  events?.on('hashChangeComplete', (url) => {
    if (url.includes('#signup') && view === View.Login) {
      setView(View.Signup);
    } else if (url.includes('#login') && view === View.Signup) {
      setView(View.Login);
    }
  });

  const form = 'auth';

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    try {
      if (view === View.Login) {
        await login();
      } else {
        await register();
      }
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar(
        view === View.Login
          ? 'Login Error Please try again later'
          : 'Signup Error Please try again later'
      );
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
            <FormProvider {...methods}>
              <form id={form} onSubmit={handleSubmit(onSubmit)}>
                {renderView()}
              </form>
            </FormProvider>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AuthPage;
