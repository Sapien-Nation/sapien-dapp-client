// assets
import { Spn as SpnIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// emums
import { StoreSteps } from '../WalletEnums';

interface Props {
  setShowTabsMenu: (showTab: boolean) => void;
  setStep: (step: StoreSteps) => void;
  setCurrentBadge: (Badge: BadgeType) => void;
}

const BadgesList = ({ setShowTabsMenu, setStep, setCurrentBadge }: Props) => {
  return (
    <div
      style={{
        padding: '0 2.4rem',
      }}
    >
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: {
            borderRadius: 90,
          },
        }}
        id="search"
        label=""
        placeholder="Search for badges"
        style={{
          marginBottom: 0,
        }}
      />

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
          <Typography variant="button">Badge Name</Typography>
          <Typography
            style={{
              color: neutral[500],
              lineHeight: 1,
            }}
            variant="overline"
          >
            Description goes here...
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" marginLeft="auto">
          <SpnIcon />
          <Typography style={{ marginLeft: 6 }} variant="button">
            250
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default BadgesList;
