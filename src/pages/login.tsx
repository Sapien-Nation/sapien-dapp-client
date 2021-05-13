// mui
import { Typography } from '@material-ui/core';

// next
import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

const LoginPage = () => {
  return (
    <div>
      <Typography variant="h1">Login</Typography>
      <LoginForm />
      <span style={{ alignContent: 'center' }}>
        <Typography component="span" variant="subtitle2">
          Don’t have an account?
        </Typography>{' '}
        <Link passHref href="/register">
          <Typography
            color="primary"
            component="a"
            style={{ marginLeft: '4px' }}
            variant="caption"
          >
            Sign up
          </Typography>
        </Link>
      </span>
    </div>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
