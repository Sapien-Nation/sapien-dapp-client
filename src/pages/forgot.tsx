import { useState } from 'react';

// next
import Link from 'next/link';

// mui
import { CssBaseline, Box, Button, Typography } from '@material-ui/core';

// components
import { ForgotForm } from 'components/authentication';

enum View {
  Form,
  Success,
}

const ForgotPage = () => {
  const [view, setView] = useState(View.Form);

  return (
    <>
      <CssBaseline />
      <Box
        alignItems="center"
        display="flex"
        height="100vh"
        justifyContent="center"
        width="100%"
      >
        <Box
          borderRadius={2.4}
          boxShadow="0px 25px 50px rgba(52, 46, 62, 0.05);"
          display="flex"
          justifyContent="center"
          padding={5}
          width={490}
        >
          {view === View.Success ? (
            <Box textAlign="center">
              <Box marginBottom={3}>
                <Typography component="h1" variant="h2">
                  Request sent successfully
                </Typography>
              </Box>
              <Box marginBottom={3}>
                <Typography variant="body2">
                  If the email and username provided match, you will receive
                  instructions to set a new password shortly.
                </Typography>
              </Box>
              <Link href="/login">
                <Button color="primary" type="submit" variant="contained">
                  Got it!
                </Button>
              </Link>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="center"
                marginTop="2rem"
              >
                <Typography
                  color="textPrimary"
                  component="span"
                  variant="subtitle2"
                >
                  Haven’t received an email?
                </Typography>
                <Button color="inherit" onClick={() => setView(View.Form)}>
                  <Typography
                    component="a"
                    style={{
                      marginLeft: '4px',
                    }}
                    variant="caption"
                  >
                    Resend
                  </Typography>
                </Button>
              </Box>
            </Box>
          ) : (
            <ForgotForm setView={setView} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ForgotPage;
