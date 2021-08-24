import useSWR from 'swr';

// assets
import { Transaction as TransactionIcon } from 'assets';

// types
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from 'tools/types/wallet/transactions';

// components
import { WalletSkeleton } from 'components/common';

// context
import { useAuth } from 'context/user';

// mui
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';

// api
import { tokensInstance } from 'api';
import getConfig from 'api/spn-wallet/wallet/config';

// styles
import { green, neutral, red } from 'styles/colors';

// utils
import { formatTimestampToRelative } from 'utils/date';

const Transactions = () => {
  const { me } = useAuth();

  const fetcher = (url: string) =>
    tokensInstance.get(url).then((res) => res.data);

  const { data: transactions } = useSWR(
    `/api/v3/user/${me.id}/wallet/transactions`,
    { fetcher }
  );

  const web3Config = getConfig(false); // replace by env var (mainnet / testnet)

  if (!transactions) return <WalletSkeleton />;
  // @Javier TODO show Empty if transactions.length === 0 ?
  if (transactions && transactions.length > 0)
    return (
      <Box padding={2}>
        <>
          {transactions.map((transactions: Transaction, index) => (
            <Box
              key={index}
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              marginBottom={1}
              style={{ gap: 20 }}
            >
              <Badge // @Javier TODO show correct circle image based on transactions.type (DEPOSIT, SELL, PURCHASE...)
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
                  {TransactionType[transactions.type]}
                </Typography>
                <Typography
                  style={{
                    lineHeight: 1.4,
                    color: neutral[500],
                    fontWeight: 400,
                  }}
                  variant="button"
                >
                  {formatTimestampToRelative(transactions.createdAt)}
                  {`, `}
                  {TransactionStatus[transactions.status]}
                </Typography>
              </Box>
              <Box alignItems="center" display="flex" marginLeft="auto">
                <Box display="flex" flexDirection="column">
                  <Typography style={{ lineHeight: 1.4 }} variant="button">
                    {transactions.amount} SPN
                  </Typography>
                  <Typography
                    style={{
                      lineHeight: 1.4,
                      color: neutral[500],
                      fontWeight: 400,
                    }}
                    variant="button"
                  >
                    ${transactions.amount}
                  </Typography>
                </Box>
                <IconButton aria-label="go to tx">
                  <Link
                    href={`${web3Config.EXPLORER_BASE_URL}${transactions.txHash}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExitToAppIcon
                      fontSize="small"
                      style={{ color: neutral[400] }}
                    />
                  </Link>
                </IconButton>
              </Box>
            </Box>
          ))}
        </>
      </Box>
    );
};

export default Transactions;
