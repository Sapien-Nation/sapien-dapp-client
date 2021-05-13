// mui
import { Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';
import { LoginForm } from 'components/authentication';

const LoginPage = () => {
  return (
    <div>
      <Typography variant="h1">Login</Typography>
      <LoginForm />
    </div>
  );
};

LoginPage.Layout = Layout;

export default LoginPage;
