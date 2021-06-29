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
import { neutral, primary } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const MyTransactions = () => {
  return (
    <Box padding={2}>
      <Typography
        component="h6"
        style={{
          color: neutral[500],
          marginBottom: 20,
        }}
        variant="caption"
      >
        My Transactions
      </Typography>
      <Query
        api="/api/v3/balance/transactions"
        options={{ fetcher: () => [mockTransaction()] }}
      >
        {(transactions: Array<Transaction>) => (
          <>
            {transactions.map((transactions, index) => (
              <Box
                key={index}
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                style={{ gap: 20 }}
              >
                <Avatar style={{ backgroundColor: '#FFECF2' }}>
                  <TransactionIcon />
                </Avatar>
                <Box display="flex" flexDirection="column">
                  <Typography style={{ lineHeight: 1.4 }} variant="button">
                    {transactions.info.type}
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: 1.4,
                      color: neutral[500],
                      fontWeight: 400,
                    }}
                    variant="button"
                  >
                    {formatTimestampToRelative(transactions.updatedAt)}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" marginLeft="auto">
                  <Typography style={{ lineHeight: 1.4 }} variant="button">
                    {transactions.info.amount}
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: 1.4,
                      color: neutral[500],
                      fontWeight: 400,
                    }}
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
        style={{
          fontSize: 14,
          textAlign: 'center',
          color: primary[800],
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
