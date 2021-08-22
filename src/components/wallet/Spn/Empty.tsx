// assets
import { EmptySpn } from 'assets';

// assets
import { MetamaskLogo } from 'assets';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// styles
import { neutral } from 'styles/colors';

const Empty = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        padding={2.4}
        style={{
          gap: 20,
        }}
        textAlign="center"
      >
        <EmptySpn />
        <Typography variant="subtitle1">You do not have enough SPN</Typography>
        <Typography variant="body2">
          To be able to gift SPN to others, you need to have at least 100 SPN in
          your balance.
        </Typography>
      </Box>
      <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
        <Button
          fullWidth
          aria-label="Deposit with metamask"
          style={{
            backgroundColor: neutral[700],
            color: 'white',
          }}
          variant="contained"
        >
          <MetamaskLogo />
          <span style={{ marginLeft: 10 }}>Deposit with Metamask</span>
        </Button>
      </div>
    </Box>
  );
};

export default Empty;
