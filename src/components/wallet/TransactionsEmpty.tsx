import { useRouter } from 'next/router';

// assets
import { EmptyBadges } from 'assets';

// context
import { useWallet } from 'context/wallet';

// mui
import { Box, Button, Typography } from '@material-ui/core';

const TransactionsEmpty = () => {
  const { push } = useRouter();
  const { dispatchWalletState, setWalletOpen } = useWallet();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
      paddingBottom={2.4}
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        style={{
          gap: 20,
        }}
        textAlign="center"
      >
        <EmptyBadges />
        <Typography variant="subtitle1">You have transactions yet</Typography>
        <Typography variant="body2">
          Your transactions history will be here
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Button
          fullWidth
          aria-label="Explore Tribes"
          color="primary"
          style={{
            marginBottom: 10,
          }}
          variant="contained"
          onClick={() => {
            setWalletOpen(false);
            push('/discovery');
          }}
        >
          Explore Tribes
        </Button>
        <Button
          fullWidth
          aria-label="Go to Store"
          color="default"
          variant="contained"
          onClick={() => {
            dispatchWalletState({
              type: 'currentTab',
              payload: 2,
            });
          }}
        >
          Go to Store
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionsEmpty;
