import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

// mui
import { Box, Typography } from '@material-ui/core';

const LoginPage = () => {
  return (
    <>
      <Typography variant="h1">Log in</Typography>
      <Box marginTop={6.5}>
        <LoginForm />
      </Box>
      <Box marginTop={2} textAlign="center">
        <Typography component="span" variant="subtitle2">
          Don’t have an account?
        </Typography>{' '}
        <Link href="/register">
          <a>
            <Typography variant="caption">Sign up</Typography>
          </a>
        </Link>
      </Box>
    </>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
