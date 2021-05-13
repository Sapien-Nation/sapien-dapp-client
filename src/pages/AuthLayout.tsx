// mui
import { Box, CssBaseline } from '@material-ui/core';

// assets
import { FullLogo } from 'assets';

interface Props {
  children: React.ReactElement;
}

const AuthLayout = ({ children }: Props) => {
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
            backgroundImage: 'url(static/auth.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <Box alignItems="center" display="flex" justifyContent="center">
          <FullLogo />
          {children}
        </Box>
      </div>
    </>
  );
};

export default AuthLayout;
