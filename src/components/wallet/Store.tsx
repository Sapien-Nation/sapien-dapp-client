import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';

function NumericInputCounter() {
  const { register, setValue, watch } = useForm({
    defaultValues: {
      badgesAmount: 0,
    },
  });
  const watchBadgesAmount = watch('badgesAmount');
  const handleIncrement = () => {
    setValue('badgesAmount', Number(watchBadgesAmount) + 1, {
      shouldValidate: true,
    });
  };

  const handleDecrement = () => {
    if (Number(watchBadgesAmount) < 1) return;
    setValue('badgesAmount', Number(watchBadgesAmount) - 1, {
      shouldValidate: true,
    });
  };
  return (
    <Box alignItems="center" display="flex">
      <IconButton
        style={{
          padding: 1.4,
          backgroundColor: neutral[200],
        }}
        onClick={handleDecrement}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <TextField
        InputProps={{
          style: {
            width: 36,
            padding: '1rem 1.2rem',
            height: 34,
            minHeight: 32,
            backgroundColor: '#FFF',
            margin: '0 1rem',
          },
        }}
        id="badges-number"
        inputProps={{
          ...register('badgesAmount'),
        }}
        label=""
        style={{
          marginBottom: 0,
        }}
        type="number"
      />
      <IconButton
        style={{
          padding: 1.4,
          backgroundColor: neutral[200],
        }}
        onClick={handleIncrement}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

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
            <Box
              display="flex"
              flexDirection="column"
              paddingX={2.4}
              paddingY={2}
            >
              <div style={{ display: 'flex' }}>
                <IconButton
                  aria-label="go back"
                  style={{
                    padding: 0,
                    marginRight: 6,
                    marginBottom: 10,
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
              </div>
              <Box
                alignItems="center"
                bgcolor={neutral[50]}
                borderRadius={10}
                display="flex"
                marginY={1}
                padding={1.8}
                style={{
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  alt=""
                  src="/fixtures/normal/slowpoke.jpg"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
                <Box display="flex" flexDirection="column" marginLeft={1}>
                  <Typography variant="button">You</Typography>
                </Box>
                <IconButton
                  aria-label="close"
                  style={{
                    padding: 0,
                    marginLeft: 'auto',
                  }}
                  onClick={() => {
                    setShowTabsMenu(true);
                    setStep(Steps.Badges);
                  }}
                >
                  <CloseIcon fontSize="small" style={{ color: neutral[700] }} />
                </IconButton>
              </Box>
              <Typography
                style={{
                  color: neutral[500],
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  lineHeight: 1,
                  margin: '1rem 0',
                }}
                variant="overline"
              >
                Will receive
              </Typography>
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
                  <NumericInputCounter />
                </Box>
              </Box>
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
