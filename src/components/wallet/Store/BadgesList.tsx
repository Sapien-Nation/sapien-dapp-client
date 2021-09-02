// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// components
import SearchInput from '../shared/SearchInput';
import TokenFetcher from '../shared/TokenFetcher';
import { Query, WalletSkeleton } from 'components/common';

// context
import { useWallet } from 'context/wallet';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// enums
import { StoreSteps } from '../WalletEnums';

export const BadgeItem = ({
  avatar,
  blockchainId,
  description,
  dispatchWalletState,
  id,
  name,
  spn,
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
      dispatchWalletState({
        type: 'update',
        payload: {
          showTabsMenu: false,
          storeStep: StoreSteps.Confirmation,
          storeCurrentBadge: {
            spn,
            name,
            description,
            blockchainId,
            id,
          },
        },
      });
    }}
  >
    <Avatar
      alt="Badge image"
      imgProps={{
        style: {
          borderRadius: 40,
          padding: 3,
        },
      }}
      src={avatar}
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

const BadgesList = () => {
  const { dispatchWalletState } = useWallet();
  return (
    <div
      style={{
        padding: '0 2.4rem',
      }}
    >
      <Query
        api="/api/v3/badge/store/listBadges"
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
          />
        )}
      </Query>
    </div>
  );
};

export default BadgesList;
