import { useRouter } from 'next/router';
import { useState } from 'react';

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
          <ChangePassword
            changeView={() => setView(View.Success)}
            token={(router?.query?.token as string) || ''}
          />
        );
      case View.Success:
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        );
    }
  };

  return (
    <Box display="gird" gap={3}>
      <Typography component="h1">
        {view === View.Form
          ? 'Create New Password'
          : 'Password Change successfully'}
      </Typography>
      {renderView()}
    </Box>
  );
};

ChangePasswordPage.Layout = Layout;

export default ChangePasswordPage;
