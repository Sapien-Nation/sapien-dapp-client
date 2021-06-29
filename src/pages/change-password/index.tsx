import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// components
import Layout from '../AuthLayout';
import { ForgotForm } from 'components/authentication';

enum View {
  Form,
  Success,
}

const ForgotPage = () => {
  const { push } = useRouter();
  const [view, setView] = useState(View.Form);

  const renderView = () => {
    switch (view) {
      case View.Form:
        return (
          <>
            <Typography variant="h1">Forgotten Password</Typography>
            <Box marginTop={6.5}>
              <ForgotForm changeView={() => setView(View.Success)} />
            </Box>
            <Box marginTop={2} textAlign="center">
              <Typography variant="overline">
                Remembered your password?
              </Typography>{' '}
              <Link href="/login">
                <a>
                  <Typography variant="caption">Log in</Typography>
                </a>
              </Link>
            </Box>
          </>
        );
      case View.Success:
        return (
          <Box textAlign="center">
            <Typography variant="h2">Request sent successfully</Typography>
            <Box marginTop={4}>
              <Typography variant="body2">
                If the email and username provided match, you will receive
                instructions to set a new password shortly.
              </Typography>
            </Box>
            <Box marginTop={4}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => push('/login')}
              >
                Got it!
              </Button>
            </Box>
            <Box marginTop={2}>
              <Typography
                color="textPrimary"
                component="span"
                variant="subtitle2"
              >
                Haven’t received an email?
              </Typography>{' '}
              <Typography
                style={{ cursor: 'pointer' }}
                variant="caption"
                onClick={() => setView(View.Form)}
              >
                Resend
              </Typography>
            </Box>
          </Box>
        );
    }
  };

  return <>{renderView()}</>;
};

ForgotPage.Layout = Layout;

export default ForgotPage;
