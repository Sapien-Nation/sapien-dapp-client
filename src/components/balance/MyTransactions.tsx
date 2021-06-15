// assets
import { Transaction as TransactionIcon } from 'assets';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// styles
import { darkGrey, primary } from 'styles/colors';

const MyBalance = () => {
  return (
    <Box padding={2}>
      <Typography
        sx={{
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: darkGrey,
          fontWeight: 700,
          marginBottom: 2,
        }}
        variant="subtitle2"
      >
        My Transactions
      </Typography>
      <Box
        alignItems="center"
        display="flex"
        gap={2}
        justifyContent="space-between"
      >
        <Avatar sx={{ bgcolor: '#FFECF2' }}>
          <TransactionIcon />
        </Avatar>
        <Box display="flex" flexDirection="column">
          <Typography sx={{ lineHeight: 1.4 }} variant="button">
            Withdrawal
          </Typography>
          <Typography
            sx={{ lineHeight: 1.4, color: darkGrey, fontWeight: 400 }}
            variant="button"
          >
            Feb 2, 08:50
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" marginLeft="auto">
          <Typography sx={{ lineHeight: 1.4 }} variant="button">
            - 500 SPN
          </Typography>
          <Typography
            sx={{ lineHeight: 1.4, color: darkGrey, fontWeight: 400 }}
            variant="button"
          >
            $50.39
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          textAlign: 'center',
          color: primary,
          fontWeight: 600,
          marginTop: 1,
        }}
      >
        See All
      </Typography>
    </Box>
  );
};

export default MyBalance;
