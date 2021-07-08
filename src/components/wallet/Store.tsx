import { useState } from 'react';

// assets
import { Spn as SpnIcon, Store as StoreIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';

enum Steps {
  Badges,
  Confirmation,
  Checkout,
}

interface Props {
  showTabsMenu: boolean;
  setShowTabsMenu: (status: boolean) => void;
}

const Store = ({ showTabsMenu, setShowTabsMenu }: Props) => {
  const [step, setStep] = useState(Steps.Badges);
  const renderStep = () => {
    switch (step) {
      case Steps.Badges:
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
                setStep(Steps.Confirmation);
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
      case Steps.Confirmation:
        return (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Box alignItems="center" display="flex" padding={2}>
              <>
                <IconButton
                  aria-label="go back"
                  style={{
                    padding: 0,
                    marginRight: 6,
                  }}
                  onClick={() => {
                    setShowTabsMenu(true);
                    setStep(Steps.Badges);
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    style={{ color: neutral[700] }}
                  />
                </IconButton>
                <Typography variant="button">Confirmation</Typography>
              </>
            </Box>
            <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setStep(Steps.Checkout)}
              >
                <StoreIcon
                  style={{ fill: '#FFF', marginRight: 7, zoom: '80%' }}
                />{' '}
                500 SPN
              </Button>
            </div>
          </Box>
        );
      case Steps.Checkout:
        return <div>Checkout</div>;
    }
  };
  return (
    <div
      style={{
        height: showTabsMenu ? 'calc(100% - 63px)' : '100%',
      }}
    >
      {renderStep()}
    </div>
  );
};

export default Store;
