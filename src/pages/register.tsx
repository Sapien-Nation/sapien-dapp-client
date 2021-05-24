// mui
import { Box, Typography } from '@material-ui/core';

// next
import Link from 'next/link';

// components
import Layout from './AuthLayout';
import { RegisterForm } from 'components/authentication';

const RegisterPage = () => {
  return (
    <div>
      <Typography style={{ marginBottom: '4rem' }} variant="h1">
        Sign Up
      </Typography>
      <RegisterForm />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Typography component="span" variant="subtitle2">
          Already have an account?
        </Typography>
        <Link passHref href="/login">
          <Typography
            component="a"
            style={{ marginLeft: '4px' }}
            variant="caption"
          >
            Log in
          </Typography>
        </Link>
      </Box>
    </div>
  );
};

RegisterPage.Layout = Layout;

export default RegisterPage;
