/* istanbul ignore file */
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
  image: {
    backgroundImage: 'url(static/auth.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit } = methods;

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
          <Box display="flex" flexDirection="column" width="39rem">
            <FullLogo />
            <FormProvider {...methods}>
              <form
                id={form}
                onSubmit={handleSubmit(() => console.log('Log in'))}
              >
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
