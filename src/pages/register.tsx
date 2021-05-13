// mui
import { Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';
import { RegisterForm } from 'components/authentication';

const RegisterPage = () => {
  return (
    <div>
      <Typography variant="h1">Sign Up</Typography>
      <RegisterForm />
    </div>
  );
};

RegisterPage.Layout = Layout;

export default RegisterPage;
