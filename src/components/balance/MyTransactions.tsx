// assets
import { Transaction as TransactionIcon } from 'assets';

// types
import type { Transaction } from 'tools/types/balance/transactions';

// mocks
import { mockTransaction } from 'tools/mocks/balance/transactions';

// components
import { Query } from 'components/common';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// styles
import { darkGrey, primary } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const MyTransactions = () => {
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
      <Query
        api="/api/balance/transactions"
        options={{ fetcher: () => [mockTransaction()] }}
      >
        {(transactions: Array<Transaction>) => (
          <>
            {transactions.map((transactions, index) => (
              <Box
                key={index}
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
                    {transactions.info.type}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: 1.4, color: darkGrey, fontWeight: 400 }}
                    variant="button"
                  >
                    {formatTimestampToRelative(transactions.updatedAt)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" marginLeft="auto">
                  <Typography sx={{ lineHeight: 1.4 }} variant="button">
                    {transactions.info.amount}
                  </Typography>
                  <Typography
                    sx={{ lineHeight: 1.4, color: darkGrey, fontWeight: 400 }}
                    variant="button"
                  >
                    ${transactions.info.amount}
                  </Typography>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Query>
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

export default MyTransactions;
