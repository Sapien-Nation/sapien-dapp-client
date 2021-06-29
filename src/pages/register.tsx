import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { RegisterForm } from 'components/authentication';

// mui
import { Box, Typography } from '@material-ui/core';

const RegisterPage = () => {
  return (
    <>
      <Typography variant="h1">Sign Up</Typography>
      <Box marginTop={6.5}>
        <RegisterForm />
      </Box>
      <Box marginTop={2} textAlign="center">
        <Typography variant="overline">Already have an account?</Typography>{' '}
        <Link href="/login">
          <a>
            <Typography variant="caption">Log in</Typography>
          </a>
        </Link>
      </Box>
    </>
  );
};

RegisterPage.Layout = Layout;

export default RegisterPage;
