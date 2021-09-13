// mui
import { Box, CssBaseline, useMediaQuery, useTheme } from '@material-ui/core';

// assets
import { FullLogo } from 'assets';

// context
import { useAuth } from 'context/user';

// components
import { Redirect } from 'components/common';

interface Props {
  children: React.ReactElement;
}

const AuthLayout = ({ children }: Props) => {
  const theme = useTheme();
  const { me, isLoggingIn, newUser } = useAuth();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (newUser && isLoggingIn === false && me) {
    return <Redirect to="/client/sapien" />;
  } else if (isLoggingIn === false && me) return <Redirect to="/" />;

  return (
    <>
      <CssBaseline />
      <Box
        display="grid"
        gridTemplateColumns={matches ? '1fr' : '1fr 1.6fr'}
        height="100vh"
        padding={matches ? 2 : 0}
      >
        {matches === false && (
          <Box position="relative">
            <img
              alt="Sapien Network"
              src="https://d151dmflpumpzp.cloudfront.net/images/auth.jpeg"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </Box>
        )}
        <Box
          alignItems="center"
          display="flex"
          flexWrap="wrap"
          overflow="auto"
          paddingBottom={4}
          paddingTop={8}
        >
          <div style={{ width: '100%', maxWidth: '40rem', margin: '0 auto' }}>
            <FullLogo />
            <Box marginTop={4.5}>{children}</Box>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
