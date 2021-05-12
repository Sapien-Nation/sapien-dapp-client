// mui
import { Box, CssBaseline } from '@material-ui/core';

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
          <Box
            display="flex"
            flexDirection="column"
            margin="5rem 0"
            width="39rem"
          >
            {children}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AuthLayout;
