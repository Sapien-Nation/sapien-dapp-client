import Link from 'next/link';

// mui
import { Box, Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

const LoginPage = () => {
  return (
    <Box display="grid" gap={3}>
      <Typography variant="h1">Log in</Typography>
      <LoginForm />
      <Typography paragraph>
        <Typography component="span" variant="subtitle2">
          Don’t have an account?
        </Typography>
        <Link href="/register">
          <a>
            <Typography variant="caption">Sign up</Typography>
          </a>
        </Link>
      </Typography>
    </Box>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
