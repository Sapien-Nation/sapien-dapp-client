import { useState } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// components
import ChangePassword from 'components/authentication/ChangePassword';
import Layout from '../AuthLayout';

enum View {
  Form,
  Success,
}

const ChangePasswordPage = () => {
  const router = useRouter();
  const [view, setView] = useState(View.Form);

  const renderView = () => {
    switch (view) {
      case View.Form:
        return (
          <>
            <Typography component="h1" variant="h2">
              Create New Password
            </Typography>
            <ChangePassword
              changeView={() => setView(View.Success)}
              token={(router?.query?.token as string) || ''}
            />
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
              Password Change successfully
            </Typography>
            <Link passHref href="/login">
              <Button color="primary" variant="contained">
                Login
              </Button>
            </Link>
          </Box>
        );
    }
  };

  return <>{renderView()}</>;
};

ChangePasswordPage.Layout = Layout;

export default ChangePasswordPage;
