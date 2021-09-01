// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { black, primary, neutral } from 'styles/colors';

// components
import SearchInput from '../shared/SearchInput';
import TokenFetcher from '../shared/TokenFetcher';
import Empty from './Empty';
import { Query, WalletSkeleton } from 'components/common';

// mui
import { Avatar, Badge, Box, Typography, makeStyles } from '@material-ui/core';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// enums
import { MyBadgesSteps } from '../WalletEnums';

const useStyles = makeStyles(() => ({
  badge: {
    backgroundColor: black,
    border: '3px solid #fff',
    borderRadius: 22,
    color: '#fff',
    height: 22,
    right: 6,
    top: 6,
  },
}));

export const BadgeItem = ({
  id,
  blockchainId,
  description,
  dispatchWalletState,
  name,
  quantity,
  spn,
  userIsAdmin,
  walletOpen,
}) => {
  const classes = useStyles();
  return (
    <Box
      alignItems="center"
      bgcolor={neutral[50]}
      borderRadius={10}
      display="flex"
      marginTop={1}
      padding={1.8}
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        if (walletOpen && walletOpen.userName) {
          dispatchWalletState({
            type: 'update',
            payload: {
              myBadgesTransition: 'forward',
              myBadgesCurrentReceiver: {
                name: walletOpen.userName,
                description: walletOpen.displayName,
              },
              showTabsMenu: false,
              showAuthorToBadge: false,
              myBadgesStep: MyBadgesSteps.Confirmation,
              myBadgesCurrentBadge: {
                id,
                blockchainId,
                description,
                name,
                price: spn,
                quantity,
                userIsAdmin,
              },
            },
          });
        } else {
          dispatchWalletState({
            type: 'update',
            payload: {
              myBadgesTransition: 'forward',
              showTabsMenu: false,
              myBadgesStep: MyBadgesSteps.Receivers,
              myBadgesCurrentBadge: {
                id,
                blockchainId,
                description,
                name,
                price: spn,
                quantity,
                userIsAdmin,
              },
            },
          });
        }
      }}
    >
      <Badge badgeContent={quantity} classes={{ badge: classes.badge }}>
        <Avatar
          alt=""
          imgProps={{
            style: {
              borderRadius: 40,
              padding: 3,
            },
          }}
          src="/fixtures/normal/slowpoke.jpg"
          style={{
            width: 40,
            height: 40,
            border: `2px solid ${primary[800]}`,
          }}
        />
      </Badge>
      <Box display="flex" flexDirection="column" marginLeft={1}>
        <Typography variant="button">{name}</Typography>
        <Typography
          style={{
            color: neutral[500],
            lineHeight: 1,
          }}
          variant="overline"
        >
          {description}
        </Typography>
      </Box>
      <Box alignItems="center" display="flex" marginLeft="auto">
        <SpnIcon />
        <Typography style={{ marginLeft: 6 }} variant="button">
          {spn}
        </Typography>
      </Box>
    </Box>
  );
};

const BadgesList = () => {
  const { me } = useAuth();
  const { dispatchWalletState, walletOpen } = useWallet();

  return (
    <div
      style={{
        padding: '0 2.4rem',
        height: '100%',
      }}
    >
      <Query
        api={`/api/v3/user/${me.id}/listBadges`}
        empty={<Empty />}
        loader={<WalletSkeleton />}
        options={{
          fetcher: TokenFetcher,
        }}
      >
        {(list) => (
          <SearchInput
            ItemComponent={BadgeItem}
            dispatchWalletState={dispatchWalletState}
            list={list}
            walletOpen={walletOpen}
          />
        )}
      </Query>
    </div>
  );
};

export default BadgesList;
