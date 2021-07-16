import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import NumberFormat from 'react-number-format';

// mui
import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ContentCopy as ContentCopyIcon } from '@material-ui/icons';

// styles
import { neutral, primary, red } from 'styles/colors';

// assets
import { WithdrawSuccess, Spn as SpnIcon } from 'assets';

// utils
import { formatSpn, formatSpnToUsd } from 'utils/spn';

// emums
import { View } from './WalletEnums';

enum Step {
  Withdraw = 1,
  WithdrawSuccess,
}

const form = 'withdraw-form';
const minSpn = 99;
const userBalance = 15000;

const useStyles = makeStyles(() => ({
  paper: { maxWidth: 510 },
  amountInput: {
    '& input::placeholder': {
      color: neutral[700],
      opacity: 1,
    },
  },
  amountInputFocus: {
    border: 'none !important',
  },
}));

const NumberFormatInput = ({ name, onChange, ...rest }) => {
  delete rest.inputRef;
  return (
    <NumberFormat
      thousandSeparator
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      {...rest}
    />
  );
};

const Withdraw = ({ setView }: { setView: (view: View) => void }) => {
  const [step, setStep] = useState(Step.Withdraw);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      destinationAddress: '',
      withdraw: 0,
    },
  });
  const classes = useStyles();
  const watchWithdraw = watch('withdraw');
  const { enqueueSnackbar } = useSnackbar();

  const copyAddress = async () => {
    try {
      const address = await navigator.clipboard.readText();
      setValue('destinationAddress', address, { shouldValidate: true });
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  const handleFormSubmit = async ({
    destinationAddress,
    withdraw,
  }: {
    destinationAddress: string;
    withdraw: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('destinationAddress', destinationAddress);
      formData.append('withdraw', withdraw);
      setStep(Step.WithdrawSuccess);
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const renderFields = () => {
    switch (step) {
      case Step.Withdraw: {
        return (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Box marginX={2} marginY={3}>
              <TextField
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Paste">
                        <IconButton
                          aria-label="Paste"
                          edge="end"
                          size="small"
                          style={{ color: primary[800] }}
                          onClick={copyAddress}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.destinationAddress)}
                helperText={
                  <Box
                    component="span"
                    display="block"
                    marginTop={0.5}
                    textAlign="right"
                  >
                    <ErrorMessage errors={errors} name="destinationAddress" />
                  </Box>
                }
                inputProps={{
                  ...register('destinationAddress', {
                    required: {
                      value: true,
                      message: 'Enter an address',
                    },
                  }),
                  autoComplete: 'destinationAddress',
                  maxLength: 42,
                }}
                label={
                  <Box display="flex" justifyContent="space-between">
                    Destination Wallet
                  </Box>
                }
                placeholder="Enter wallet address"
              />
              <Box bgcolor={neutral[50]} borderRadius={10} padding={2}>
                <Typography
                  style={{
                    color: neutral[500],
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                  variant="overline"
                >
                  You withdraw
                </Typography>
                <br />
                <SpnIcon style={{ marginRight: 10 }} />
                <Input
                  classes={{
                    root: classes.amountInput,
                    focused: classes.amountInputFocus,
                  }}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      style={{ color: neutral[700] }}
                    >
                      SPN{' '}
                      <small
                        style={{
                          marginLeft: 10,
                          color: neutral[500],
                          fontSize: 12,
                          fontWeight: 100,
                        }}
                      >
                        {formatSpnToUsd(watchWithdraw)}
                      </small>
                    </InputAdornment>
                  }
                  inputComponent={NumberFormatInput as any}
                  inputProps={{
                    ...register('withdraw'),
                    autoComplete: 'withdraw',
                    maxLength: 8,
                  }}
                  placeholder="0"
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 22,
                    fontWeight: 700,
                    minHeight: 30,
                    padding: 0,
                    width: 140 + String(watchWithdraw)?.length * 16,
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={3}
                >
                  <Typography
                    style={{ color: red[700], fontWeight: 100 }}
                    variant="caption"
                  >
                    {isDirty && watchWithdraw < minSpn
                      ? 'Minimum 100 SPN'
                      : null}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 100,
                      color:
                        userBalance < watchWithdraw ? red[700] : neutral[500],
                    }}
                    variant="caption"
                  >
                    Balance{' '}
                    {watchWithdraw <= userBalance
                      ? formatSpn(userBalance - watchWithdraw)
                      : formatSpn(userBalance)}{' '}
                    SPN
                  </Typography>
                </Box>
              </Box>
            </Box>
            <div>
              <Typography
                style={{
                  color: neutral[500],
                  fontWeight: 100,
                  textAlign: 'center',
                  marginBottom: 20,
                }}
                variant="h6"
              >
                Additional fees may apply
              </Typography>
              <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
                <Button
                  fullWidth
                  color="primary"
                  disabled={
                    watchWithdraw <= minSpn || watchWithdraw > userBalance
                  }
                  type="submit"
                  variant="contained"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </Box>
        );
      }
      case Step.WithdrawSuccess: {
        return (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="space-between"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
              paddingX={3.5}
              textAlign="center"
            >
              <WithdrawSuccess />
              <Typography
                style={{ marginTop: 40, marginBottom: 15, lineHeight: 1.6 }}
                variant="body2"
              >
                You have successfully withdrawn {watchWithdraw} SPN from your
                balance
              </Typography>
              <Typography style={{ color: neutral[500] }} variant="h6">
                The funds will appear on your external wallet account shortly.
              </Typography>
            </Box>
            <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => setView(View.Tabs)}
              >
                Thank you!
              </Button>
            </div>
          </Box>
        );
      }
    }
  };

  return (
    <form
      id={form}
      style={{
        height: '100%',
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {renderFields()}
    </form>
  );
};

export default Withdraw;
