import dynamic from 'next/dynamic';
import Link from 'next/link';

// components
const DynamicRegisterForm = dynamic<any>(
  () =>
    import('components/authentication').then((mod) => mod.RegisterForm) as any,
  {
    ssr: false,
  }
);
const DynamicLayout = dynamic<any>(
  () => import('components/common').then((mod) => mod.AuthLayout) as any,
  {
    ssr: false,
  }
);

// mui
import { Box, Typography } from '@material-ui/core';

const RegisterPage = () => {
  return (
    <>
      <Typography variant="h1">Sign Up</Typography>
      <Box marginTop={6.5}>
        <DynamicRegisterForm />
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

RegisterPage.Layout = DynamicLayout;

export default RegisterPage;
