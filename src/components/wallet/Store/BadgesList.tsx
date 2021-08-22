import useSWR from 'swr';

// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// components
import SearchInput from '../shared/SearchInput';

// context
import { useWallet } from 'context/wallet';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// api
import { tokensInstance } from 'api';

// enums
import { StoreSteps } from '../WalletEnums';

export const BadgeItem = ({
  dispatchWalletState,
  description,
  name,
  spn,
  blockchainId,
  id,
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
  const { data: list } = useSWR('/api/v3/badge/store/listBadges', { fetcher });
  const { dispatchWalletState } = useWallet();
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
      />
    </div>
  );
};

export default BadgesList;
