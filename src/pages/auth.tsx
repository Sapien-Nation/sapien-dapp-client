/* istanbul ignore file */

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// mui
import { Box, CssBaseline, makeStyles } from '@material-ui/core';

// assets
import { FullLogo } from 'components/assets/svg';

// components
import { Login, Signup } from 'components/auth';

enum View {
  Login,
  Signup,
}

const useStyles = makeStyles({
  layout: {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: '1fr 560px',
  },
  image: {
    backgroundImage: 'url(static/auth.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '39rem',
  },
});

const AuthPage = () => {
  const { asPath, events } = useRouter();

  const [view, setView] = useState(() =>
    asPath?.includes('#signup') ? View.Signup : View.Login,
  );

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
    setView(url.includes('#signup') ? View.Signup : View.Login);
  });
  const form = 'auth';
  const methods = useForm();

  return (
    <>
      <CssBaseline />
      <Box className={classes.layout}>
        <Box className={classes.image}></Box>
        <Box className={classes.content}>
          <Box className={classes.form}>
            <FullLogo />
            <FormProvider {...methods}>
              <form id={form}>{renderView()}</form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;
