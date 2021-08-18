import useSWR from 'swr';

// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// components
import SearchInput from '../shared/SearchInput';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// api
import { tokensInstance } from 'api';

// enums
import { MyBadgesSteps } from '../WalletEnums';

export const BadgeItem = ({
  description,
  dispatchWalletState,
  name,
  spn,
  walletOpen,
}) => (
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
              price: spn,
              name,
              description,
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
              price: spn,
              name,
              description,
            },
          },
        });
      }
    }}
  >
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

const fetcher = (url: string) =>
  tokensInstance.get(url).then((res) => res.data);

const BadgesList = () => {
  const { me } = useAuth();
  const { dispatchWalletState, walletOpen } = useWallet();
  const { data: list } = useSWR(`/api/v3/user/${me.id}/listBadges`, {
    fetcher,
  });
  return (
    <div
      style={{
        padding: '0 2.4rem',
      }}
    >
      <SearchInput
        ItemComponent={BadgeItem}
        dispatchWalletState={dispatchWalletState}
        list={list}
        walletOpen={walletOpen}
      />
    </div>
  );
};

export default BadgesList;
