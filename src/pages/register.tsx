import Link from 'next/link';

// mui
import { Box, Typography } from '@material-ui/core';

// components
import Layout from './AuthLayout';
import { RegisterForm } from 'components/authentication';

const RegisterPage = () => {
  return (
    <Box display="grid" gap={3}>
      <Typography variant="h1">Sign Up</Typography>
      <RegisterForm />
      <Typography paragraph>
        <Typography component="span" variant="subtitle2">
          Already have an account?
        </Typography>{' '}
        <Link href="/login">
          <a>
            <Typography variant="caption">Log in</Typography>
          </a>
        </Link>
      </Typography>
    </Box>
  );
};

RegisterPage.Layout = Layout;

export default RegisterPage;
