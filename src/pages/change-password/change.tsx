import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// components
const DynamicChangePassword = dynamic<any>(
  () => import('components/authentication/ChangePassword') as any,
  {
    ssr: false,
  }
);
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.AuthLayout) as any,
  {
    ssr: false,
  }
);

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
          <DynamicChangePassword
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
            Back to Login
          </Button>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h1">
        {' '}
        {view === View.Form ? 'Create New Password' : 'Password Changed'}
      </Typography>
      <Box marginTop={6.5}>{renderView()}</Box>
    </Box>
  );
};

ChangePasswordPage.Layout = DynamicLayout;

export default ChangePasswordPage;
