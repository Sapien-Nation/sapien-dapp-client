import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
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

//components
import { Dialog } from 'components/common';

// styles
import { neutral, primary, red } from 'styles/colors';

// assets
import { WithdrawSuccess } from 'assets';

// utils
import { formatSpn, formatSpnToUsd } from 'utils/spn';

enum Step {
  Withdraw = 1,
  WithdrawSuccess,
}

interface Props {
  onClose: () => void;
}

const form = 'withdraw-form';
const minSpn = 99;
const transactionFee = 3;
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

const WithdrawModal = ({ onClose }: Props) => {
  const [step, setStep] = useState(Step.Withdraw);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isDirty },
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
      setValue('destinationAddress', address, { shouldDirty: true });
    } catch (err) {
      enqueueSnackbar(err);
    }
  };

  const addFees = () => (transactionFee / 100) * watchWithdraw;

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
    } catch (err) {
      enqueueSnackbar(err, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const renderFees = () => {
    return (
      <Box marginTop={3}>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body2">Amount</Typography>
          <Typography variant="body2">
            {formatSpn(watchWithdraw)}
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
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">Fee {transactionFee}%</Typography>
          <Typography variant="body2">
            {formatSpn(addFees())}
            <small
              style={{
                marginLeft: 10,
                color: neutral[500],
                fontSize: 12,
                fontWeight: 100,
              }}
            >
              {formatSpnToUsd(addFees())}
            </small>
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderFields = () => {
    switch (step) {
      case Step.Withdraw: {
        return (
          <>
            <Typography
              style={{ marginTop: 40, marginBottom: 20 }}
              variant="h2"
            >
              Withdraw from balance
            </Typography>
            <Typography variant="body2">
              To withdraw funds, go to your desired external wallet and fetch
              your wallet address
            </Typography>
            <Box paddingTop={5}>
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
                inputProps={{
                  ...register('destinationAddress', {
                    required: {
                      value: true,
                      message: 'Enter an address',
                    },
                  }),
                  autoComplete: 'destinationAddress',
                  maxLength: 20,
                }}
                label={
                  <Box display="flex" justifyContent="space-between">
                    Destination Wallet
                  </Box>
                }
                placeholder="Enter wallet address"
              />
              <Box bgcolor={neutral[50]} borderRadius={2} padding={2.5}>
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
                <Input
                  required
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
            {watchWithdraw > minSpn ? renderFees() : null}
            <Button
              fullWidth
              color="primary"
              disabled={watchWithdraw <= minSpn || watchWithdraw > userBalance}
              style={{ marginTop: 40 }}
              type="submit"
              variant="contained"
            >
              Withdraw{' '}
              {watchWithdraw > minSpn && watchWithdraw <= userBalance
                ? `${formatSpn(addFees() + Number(watchWithdraw))} SPN`
                : null}
              <small style={{ marginLeft: 10, opacity: 0.4 }}>
                {watchWithdraw > minSpn && watchWithdraw <= userBalance
                  ? `${formatSpnToUsd(addFees() + Number(watchWithdraw))}`
                  : null}
              </small>
            </Button>
            <Typography
              style={{
                color: neutral[500],
                fontWeight: 100,
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 30,
                fontSize: 14,
              }}
            >
              Additional fees may apply
            </Typography>
          </>
        );
      }
      case Step.WithdrawSuccess: {
        return (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            marginTop={6}
            textAlign="center"
          >
            <WithdrawSuccess />
            <Typography
              style={{ marginTop: 4, marginBottom: 15, lineHeight: 1.6 }}
              variant="h2"
            >
              You have successfully withdrawn 2,500 SPN from your balance
            </Typography>
            <Typography style={{ color: neutral[500] }} variant="body2">
              The funds will appear on your external wallet account shortly.
            </Typography>
            <Button
              color="primary"
              style={{
                margin: '6rem 0',
              }}
              variant="contained"
              onClick={() => onClose()}
            >
              Back to My Balance
            </Button>
          </Box>
        );
      }
    }
  };

  return (
    <Dialog
      open
      actions={null}
      classes={{ paper: classes.paper }}
      onClose={onClose}
    >
      <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
        {renderFields()}
      </form>
    </Dialog>
  );
};

export default WithdrawModal;
