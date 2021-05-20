import { useEffect } from 'react';

// mui
import { Box, CssBaseline } from '@material-ui/core';

// assets
import { FullLogo } from 'assets';

// next
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

interface Props {
  children: React.ReactElement;
}

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const { me, isLoggingIn } = useAuth();

  useEffect(() => {
    if (isLoggingIn === false && me) {
      // TODO uncomment this as soon as /logout works correctly
      // router.push('/');
    }
  }, [isLoggingIn, me, router]);

  return (
    <>
      <CssBaseline />
      <div
        style={{
          display: 'grid',
          height: '100vh',
          gridTemplateColumns: '1fr 560px',
        }}
      >
        <Box
          style={{
            backgroundImage: 'url(/static/auth.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <Box
          alignSelf="center"
          display="flex"
          flexDirection="column"
          gap={4}
          justifySelf="center"
          marginY={6}
          maxWidth={390}
        >
          <FullLogo />
          {children}
        </Box>
      </div>
    </>
  );
};

export default AuthLayout;
