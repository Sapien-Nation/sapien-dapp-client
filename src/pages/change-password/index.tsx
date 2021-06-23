import { useState } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          <Box display="grid" gap={3}>
            <Typography variant="h2">Forgotten Password</Typography>
            <ForgotForm changeView={() => setView(View.Success)} />
            <Typography paragraph>
              <Typography component="span" variant="subtitle2">
                Remembered your password?
              </Typography>{' '}
              <Link href="/login">
                <a>
                  <Typography variant="caption">Log in</Typography>
                </a>
              </Link>
            </Typography>
          </Box>
        );
      case View.Success:
        return (
          <Box display="grid" gap={3}>
            <Typography variant="h2">Request sent successfully</Typography>
            <Typography variant="body2">
              If the email and username provided match, you will receive
              instructions to set a new password shortly.
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => push('/login')}
            >
              Got it!
            </Button>
            <Typography paragraph>
              <Typography
                color="textPrimary"
                component="span"
                variant="subtitle2"
              >
                Haven’t received an email?
              </Typography>
              <Button color="inherit" onClick={() => setView(View.Form)}>
                Resend
              </Button>
            </Typography>
          </Box>
        );
    }
  };

  return <>{renderView()}</>;
};

ForgotPage.Layout = Layout;

export default ForgotPage;
