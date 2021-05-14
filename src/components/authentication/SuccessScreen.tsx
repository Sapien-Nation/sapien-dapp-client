// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

interface Props {
  setView: () => void;
}

const SuccessScreen = ({ setView }: Props) => {
  return (
    <Box textAlign="center">
      <Typography component="h1" style={{ marginBottom: 30 }} variant="h2">
        Request sent successfully
      </Typography>
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
        <Typography color="textPrimary" component="span" variant="subtitle2">
          Haven’t received an email?
        </Typography>
        <Button color="inherit" onClick={() => setView()}>
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
  );
};

export default SuccessScreen;
