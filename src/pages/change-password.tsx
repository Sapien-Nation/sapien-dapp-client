import { useState } from 'react';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';

enum View {
  Form,
  Success,
}

const ChangePasswordPage = () => {
  const [view] = useState(View.Form);

  const renderView = () => {
    switch (view) {
      case View.Form:
        return (
          <>
            <Typography component="h1" variant="h2">
              Change Password
            </Typography>
            <h1>TODO FORM</h1>
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
            <Typography style={{ marginBottom: 30 }} variant="body2">
              TODO TEXT
            </Typography>
            <Link href="/login">
              <Button color="primary" type="submit" variant="contained">
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
