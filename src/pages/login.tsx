// mui
import { Box, Typography } from '@material-ui/core';

// next
import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

const LoginPage = () => {
  return (
    <div>
      <Typography style={{ marginBottom: '4rem' }} variant="h1">
        Log in
      </Typography>
      <LoginForm />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Typography component="span" variant="subtitle2">
          Don’t have an account?
        </Typography>{' '}
        <Link passHref href="/register">
          <Typography
            component="a"
            style={{ marginLeft: '4px' }}
            variant="caption"
          >
            Sign up
          </Typography>
        </Link>
      </Box>
    </div>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
