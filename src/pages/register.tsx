// mui
import { Typography } from '@material-ui/core';

// next
import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { RegisterForm } from 'components/authentication';

const RegisterPage = () => {
  return (
    <div>
      <Typography variant="h1">Sign Up</Typography>
      <RegisterForm />
      <span style={{ alignContent: 'center' }}>
        <Typography component="span" variant="subtitle2">
          Already have an account?
        </Typography>
        <Link passHref href="/login">
          <Typography
            color="primary"
            component="a"
            style={{ marginLeft: '4px' }}
            variant="caption"
          >
            Log in
          </Typography>
        </Link>
      </span>
    </div>
  );
};

RegisterPage.Layout = Layout;

export default RegisterPage;
