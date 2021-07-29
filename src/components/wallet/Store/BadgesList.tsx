// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// components
import SearchInput from '../shared/SearchInput';

// mui
import { Avatar, Box, Typography } from '@material-ui/core';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// enums
import { StoreSteps } from '../WalletEnums';

interface Props {
  setShowTabsMenu: (showTab: boolean) => void;
  setStep: (step: StoreSteps) => void;
  setCurrentBadge: (Badge: BadgeType) => void;
}

export const BadgeItem = ({
  setShowTabsMenu,
  setStep,
  setCurrentBadge,
  description,
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
      setShowTabsMenu(false);
      setStep(StoreSteps.Confirmation);
      setCurrentBadge({
        price: 250,
        name: 'Badge name',
        description: 'Description goes here...',
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

const BadgesList = ({ setShowTabsMenu, setStep, setCurrentBadge }: Props) => {
  return (
    <div
      style={{
        padding: '0 2.4rem',
      }}
    >
      <SearchInput
        ItemComponent={BadgeItem}
        setCurrentBadge={setCurrentBadge}
        setShowTabsMenu={setShowTabsMenu}
        setStep={setStep}
      />
    </div>
  );
};

export default BadgesList;
