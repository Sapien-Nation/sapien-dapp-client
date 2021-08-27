import { useRouter } from 'next/router';
import { useEffect } from 'react';

// mui
import { Box, CssBaseline, useMediaQuery, useTheme } from '@material-ui/core';

// assets
import { FullLogo } from 'assets';

// context
import { useAuth } from 'context/user';

interface Props {
  children: React.ReactElement;
}

const AuthLayout = ({ children }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const { me, isLoggingIn, newUser } = useAuth();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (newUser && isLoggingIn === false && me) {
      router.push('/client/sapien#f=signup');
    } else if (isLoggingIn === false && me) {
      router.push('/');
    }
  }, [isLoggingIn, me, router]);

  return (
    <>
      <CssBaseline />
      <Box
        display="grid"
        gridTemplateColumns={matches ? '1fr' : '1fr 560px'}
        height="100vh"
        padding={matches ? 2 : 0}
      >
        {matches === false && (
          <Box
            style={{
              backgroundImage: 'url(/static/auth.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
        )}
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          marginBottom={4}
          marginTop={8}
          paddingX={8.5}
        >
          <div style={{ width: '100%' }}>
            <FullLogo />
            <Box marginTop={4.5}>{children}</Box>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
