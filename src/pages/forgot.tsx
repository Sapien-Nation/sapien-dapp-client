import { useState } from 'react';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';
import { ForgotForm } from 'components/authentication';

enum View {
  Form,
  Success,
}

const ForgotPage = () => {
  const [view, setView] = useState(View.Form);

  const renderView = () => {
    switch (view) {
      case View.Form:
        return (
          <>
            <Typography component="h1" variant="h2">
              Forgotten Password
            </Typography>
            <ForgotForm changeView={() => setView(View.Success)} />
            <Box alignItems="center" display="flex" justifyContent="center">
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
          </>
        );
      case View.Success:
        return (
          <Box textAlign="center">
            <Typography
              component="h1"
              style={{ marginBottom: 30 }}
              variant="h2"
            >
              Request sent successfully
            </Typography>
            <Typography style={{ marginBottom: 30 }} variant="body2">
              If the email and username provided match, you will receive
              instructions to set a new password shortly.
            </Typography>
            <Link passHref href="/login">
              <Button color="primary" variant="contained">
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
              <Button color="inherit" onClick={() => setView(View.Form)}>
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
        );
    }
  };

  return <>{renderView()}</>;
};

ForgotPage.Layout = Layout;

export default ForgotPage;
