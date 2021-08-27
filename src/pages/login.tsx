import dynamic from 'next/dynamic';
import Link from 'next/link';

// components
const DynamicLoginForm = dynamic<any>(
  () => import('components/authentication').then((mod) => mod.LoginForm) as any,
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

// mui
import { Box, Typography } from '@material-ui/core';

const LoginPage = () => {
  return (
    <>
      <Typography variant="h1">Log in</Typography>
      <Box marginTop={6.5}>
        <DynamicLoginForm />
      </Box>
      <Box marginTop={2} textAlign="center">
        <Typography variant="overline">Don’t have an account?</Typography>{' '}
        <Link href="/register">
          <a>
            <Typography variant="caption">Sign up</Typography>
          </a>
        </Link>
      </Box>
    </>
  );
};

LoginPage.Layout = DynamicLayout;

export default LoginPage;
