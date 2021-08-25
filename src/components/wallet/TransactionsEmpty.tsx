// assets
import { EmptyBadges } from 'assets';

// context
import { useWallet } from 'context/wallet';

// mui
import { Box, Button, Typography } from '@material-ui/core';

const TransactionsEmpty = () => {
  const { dispatchWalletState } = useWallet();
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
          aria-label="Expore Tribes"
          color="primary"
          style={{
            marginBottom: 10,
          }}
          variant="contained"
        >
          Expore Tribes
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
