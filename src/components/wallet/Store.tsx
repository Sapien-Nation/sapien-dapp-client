import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// assets
import {
  Spn as SpnIcon,
  Store as StoreIcon,
  Checkbox as CheckboxIcon,
  CheckboxChecked as CheckboxCheckedIcon,
} from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
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
  const {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      badgesAmount: 1,
      terms: false,
    },
  });
  const watchBadgesAmount = watch('badgesAmount');

  const NumericInputCounter = () => {
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
  };

  const renderFees = () => {
    return (
      <Box marginTop={3}>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body2">Badges cost</Typography>
          <Typography variant="body2">500 SPN</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body2">Transaction fee</Typography>
          <Typography variant="body2">5%</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={1.8}>
          <Typography style={{ fontWeight: 700 }} variant="body2">
            Total
          </Typography>
          <Typography style={{ color: primary[800] }} variant="body2">
            525 SPN
          </Typography>
        </Box>
      </Box>
    );
  };

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
                    setShowTabsMenu(false);
                    setStep(Steps.Confirmation);
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    style={{ color: neutral[700] }}
                  />
                </IconButton>
                <Typography variant="button">Check Out</Typography>
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
                display="flex"
                flexDirection="column"
                justifyContent="center"
                style={{
                  gap: 10,
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
                    width: 64,
                    height: 64,
                    border: `2px solid ${primary[800]}`,
                  }}
                />
                <Typography variant="subtitle1">Badge Name (x2)</Typography>
                <Typography
                  style={{ textAlign: 'center', color: neutral[500] }}
                  variant="h6"
                >
                  Velit sed turpis tellus curabitur sit habitant sit eget lorem
                  ipsum.
                </Typography>
              </Box>
              {renderFees()}
              <Box
                bgcolor={neutral[50]}
                borderRadius={10}
                display="flex"
                justifyContent="center"
                paddingY={0.6}
              >
                <Typography style={{ color: neutral[500] }} variant="overline">
                  Remaining balance: 3,082 SPN
                </Typography>
              </Box>
            </Box>
            <Box
              borderTop="1px solid #EDEEF0"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              paddingBottom={2.4}
              paddingX={2.4}
            >
              <Controller
                control={control}
                name="terms"
                render={({ field }) => {
                  return (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disableRipple
                            checkedIcon={<CheckboxCheckedIcon />}
                            color="default"
                            icon={<CheckboxIcon />}
                            name="terms"
                            {...field}
                          />
                        }
                        label={
                          <Typography>
                            <Typography
                              style={{ fontWeight: 400 }}
                              variant="button"
                            >
                              I agree to
                            </Typography>{' '}
                            <Typography variant="button">
                              <a
                                href="https://common.sapien.network/terms.html"
                                rel="noreferrer"
                                style={{ color: '#42D1E0' }}
                                target="_blank"
                              >
                                Terms & Conditions
                              </a>
                            </Typography>
                          </Typography>
                        }
                        style={{
                          padding: '1rem 0',
                        }}
                      />
                      {errors.terms && (
                        <FormHelperText className="Mui-error">
                          <ErrorMessage errors={errors} name="terms" />
                        </FormHelperText>
                      )}
                    </>
                  );
                }}
                rules={{
                  required: {
                    value: true,
                    message: 'Please Check the box',
                  },
                }}
              />
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowTabsMenu(true);
                  setStep(Steps.Badges);
                }}
              >
                Purchase Token
              </Button>
            </Box>
          </Box>
        );
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
