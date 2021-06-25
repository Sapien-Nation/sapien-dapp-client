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
} from '@material-ui/core';
import { ContentCopy as ContentCopyIcon } from '@material-ui/icons';

//components
import { Dialog } from 'components/common';

// styles
import { black, darkGrey, gray4, primary, red } from 'styles/colors';

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
  const watchWithdraw = watch('withdraw');
  const { enqueueSnackbar } = useSnackbar();

  const copyAddress = async () => {
    const address = await navigator.clipboard.readText();
    setValue('destinationAddress', address, { shouldDirty: true });
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
                color: darkGrey,
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
                color: darkGrey,
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
            <Typography sx={{ marginY: 2 }} variant="h2">
              Withdraw from balance
            </Typography>
            <Typography variant="body2">
              To withdraw funds, go to your desired external wallet and fetch
              your wallet address
            </Typography>
            <Box paddingTop={6}>
              <TextField
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Paste">
                        <IconButton
                          aria-label="Paste"
                          edge="end"
                          size="small"
                          sx={{ color: primary }}
                          onClick={copyAddress}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  ...register('destinationAddress'),
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
              <Box bgcolor={gray4} borderRadius={2} padding={2.5}>
                <Typography
                  sx={{
                    color: darkGrey,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                  variant="subtitle2"
                >
                  You withdraw
                </Typography>
                <Input
                  required
                  endAdornment={
                    <InputAdornment position="end" sx={{ color: black }}>
                      SPN{' '}
                      <small
                        style={{
                          marginLeft: 10,
                          color: darkGrey,
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
                  sx={{
                    bgcolor: 'transparent',
                    fontSize: 22,
                    fontWeight: 700,
                    minHeight: 30,
                    padding: 0,
                    width: 140 + String(watchWithdraw)?.length * 16,
                    '.MuiTypography-root': {
                      color: black,
                      fontWeight: 700,
                      marginTop: '2px',
                    },
                    '> input::placeholder': {
                      color: black,
                      opacity: 1,
                    },
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={3}
                >
                  <Typography
                    sx={{ color: red, fontWeight: 100 }}
                    variant="caption"
                  >
                    {isDirty && watchWithdraw < minSpn
                      ? 'Minimum 100 SPN'
                      : null}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 100,
                      color: userBalance < watchWithdraw ? red : darkGrey,
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
              disabled={watchWithdraw <= minSpn || watchWithdraw > userBalance}
              sx={{ marginTop: 4 }}
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
              sx={{
                color: darkGrey,
                fontWeight: 100,
                textAlign: 'center',
                marginTop: 1,
                marginBottom: 4,
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
              sx={{ marginTop: 4, marginBottom: 1.5, lineHeight: 1.6 }}
              variant="h2"
            >
              You have successfully withdrawn 2,500 SPN from your balance
            </Typography>
            <Typography sx={{ color: darkGrey }} variant="body2">
              The funds will appear on your external wallet account shortly.
            </Typography>
            <Button
              sx={{
                marginY: 6,
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
      sx={{ '.MuiPaper-root': { maxWidth: 510 } }}
      onClose={onClose}
    >
      <form id={form} onSubmit={handleSubmit(handleFormSubmit)}>
        {renderFields()}
      </form>
    </Dialog>
  );
};

export default WithdrawModal;
