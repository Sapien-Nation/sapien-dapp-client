/* istanbul ignore file */
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// mui
import { Box, CssBaseline, makeStyles } from '@material-ui/core';

// assets
import { FullLogo } from 'components/common';

// components
import { ForgotForm, LoginForm, SignupForm } from 'components/auth';

enum View {
  Forgot,
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
    if (asPath?.includes('#signup')) {
      return View.Signup;
    } else if (asPath?.includes('#login')) {
      return View.Login;
    } else {
      return View.Forgot;
    }
  });

  const classes = useStyles();

  const renderView = () => {
    switch (view) {
      case View.Login:
        return <LoginForm />;
      case View.Forgot:
        return <ForgotForm />;
      case View.Signup:
        return <SignupForm />;
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
            {renderView()}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AuthPage;
