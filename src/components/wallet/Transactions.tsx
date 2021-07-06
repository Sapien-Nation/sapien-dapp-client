// assets
import { Transaction as TransactionIcon } from 'assets';

// types
import type { Transaction } from 'tools/types/balance/transactions';

// mocks
import { mockTransaction } from 'tools/mocks/balance/transactions';

// components
import { Query } from 'components/common';

// mui
import { Avatar, Badge, Box, IconButton, Typography } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

// styles
import { green, neutral, red } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const Transactions = () => {
  return (
    <Box padding={2}>
      <Query
        api="/api/v3/balance/transactions"
        options={{ fetcher: () => [mockTransaction(), mockTransaction()] }}
      >
        {(transactions: Array<Transaction>) => (
          <>
            {transactions.map((transactions, index) => (
              <Box
                key={index}
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                marginBottom={1}
                style={{ gap: 20 }}
              >
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <Avatar
                      alt="Slowpoke"
                      src="/fixtures/normal/slowpoke.jpg"
                      style={{
                        width: 20,
                        height: 20,
                        border: '2px solid #FFF',
                      }}
                    />
                  }
                  overlap="circle"
                >
                  <Avatar
                    style={{
                      backgroundColor: index === 1 ? red[100] : green[100],
                    }}
                  >
                    <TransactionIcon
                      style={{
                        fill: index === 1 ? red[700] : green[700],
                        transform: `${index === 0 && 'rotate(180deg)'}`,
                      }}
                    />
                  </Avatar>
                </Badge>
                <Box display="flex" flexDirection="column">
                  <Typography
                    style={{ lineHeight: 1.4, textTransform: 'capitalize' }}
                    variant="button"
                  >
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
                    {`, `}
                    {transactions.info.status}
                  </Typography>
                </Box>
                <Box alignItems="center" display="flex" marginLeft="auto">
                  <Box display="flex" flexDirection="column">
                    <Typography style={{ lineHeight: 1.4 }} variant="button">
                      {transactions.info.amount} SPN
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
                  <IconButton aria-label="go to tx">
                    <ExitToAppIcon
                      fontSize="small"
                      style={{ color: neutral[400] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Query>
    </Box>
  );
};

export default Transactions;
