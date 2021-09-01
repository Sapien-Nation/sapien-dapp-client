import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

// components
import Empty from './Empty';
import SearchInput from '../shared/SearchInput';
import TokenFetcher from '../shared/TokenFetcher';
import { Query, WalletSkeleton } from 'components/common';

// mui
import {
  Avatar,
  Box,
  Button,
  Input,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// styles
import { red, neutral } from 'styles/colors';

// utils
import { formatSpn } from 'utils/spn';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// assets
import { Spn as SpnIcon } from 'assets';

const minSpn = 99;

const useStyles = makeStyles(() => ({
  paper: { maxWidth: 510 },
  receiverItem: {
    '&:hover': {
      backgroundColor: neutral[50],
    },
  },
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

const ReceiverItem = ({
  dispatchWalletState,
  displayName,
  id,
  publicAddress,
  userName,
}) => {
  const classes = useStyles();
  return (
    <Box
      alignItems="center"
      borderRadius={10}
      className={classes.receiverItem}
      display="flex"
      marginTop={1}
      padding={0.5}
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        dispatchWalletState({
          type: 'spnCurrentReceiver',
          payload: {
            id,
            userName,
            displayName,
            publicAddress,
          },
        });
      }}
    >
      <Avatar
        alt=""
        imgProps={{
          style: {
            borderRadius: 40,
          },
        }}
        src="/fixtures/normal/slowpoke.jpg"
        style={{
          width: 40,
          height: 40,
        }}
      />
      <Box display="flex" marginLeft={1}>
        <Typography variant="button">{displayName}</Typography>
      </Box>
      <Box alignItems="center" display="flex">
        <Typography style={{ marginLeft: 6 }} variant="button">
          @{userName}
        </Typography>
      </Box>
    </Box>
  );
};

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

const Receivers = () => {
  const {
    watch,
    register,
    formState: { isDirty },
  } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const { me } = useAuth();
  const { wallet, dispatchWalletState, globalWalletState } = useWallet();
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);
  const { spnCurrentReceiver } = globalWalletState;
  const watchReceive = watch('receive');
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="calc(100% - 81px)"
      justifyContent="space-between"
    >
      <div
        style={{
          height: '100%',
          display: 'grid',
          margin: '0 2.4rem',
          gridTemplateRows: spnCurrentReceiver
            ? '32px 72px 1fr 90px'
            : '32px 50px 1fr 200px',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {spnCurrentReceiver ? (
            <>
              <IconButton
                aria-label="go back"
                style={{
                  padding: 0,
                  marginRight: 6,
                }}
                onClick={() => {
                  dispatchWalletState({
                    type: 'spnCurrentReceiver',
                    payload: null,
                  });
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  style={{ color: neutral[700] }}
                />
              </IconButton>
              <Typography variant="button">Confirmation</Typography>
            </>
          ) : (
            <Typography variant="button">Receiver</Typography>
          )}
        </div>
        {spnCurrentReceiver ? (
          <Box
            alignItems="center"
            bgcolor={neutral[50]}
            borderRadius={10}
            display="flex"
            marginBottom={1}
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
              <Typography variant="button">
                {spnCurrentReceiver.displayName}
              </Typography>
              <Typography variant="overline">
                @{spnCurrentReceiver.userName}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Query
            api="/api/v3/users"
            empty={<Empty />}
            loader={<WalletSkeleton />}
            options={{
              fetcher: TokenFetcher,
            }}
          >
            {(list) => (
              <SearchInput
                ItemComponent={ReceiverItem}
                dispatchWalletState={dispatchWalletState}
                list={list}
              />
            )}
          </Query>
        )}
        <div>
          <Typography
            style={{
              color: neutral[500],
              textTransform: 'uppercase',
              fontWeight: 700,
              lineHeight: 1,
            }}
            variant="overline"
          >
            will receive
          </Typography>
          <Box
            bgcolor={neutral[50]}
            borderRadius={10}
            marginTop={1.5}
            padding={2}
          >
            <Box alignItems="center" display="flex">
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
                  </InputAdornment>
                }
                inputComponent={NumberFormatInput as any}
                inputProps={{
                  ...register('receive'),
                  autoComplete: 'receive',
                  maxLength: 8,
                }}
                placeholder="0"
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 22,
                  fontWeight: 700,
                  minHeight: 30,
                  padding: 0,
                  width: 110 + String(watchReceive)?.length * 16,
                }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <Typography
                style={{ color: red[700], fontWeight: 100 }}
                variant="caption"
              >
                {isDirty && watchReceive * 1e6 < minSpn
                  ? 'Minimum 100 SPN'
                  : null}
              </Typography>
              <Typography
                style={{
                  fontWeight: 100,
                  color:
                    Number(wallet?.balance) / 1e6 < watchReceive
                      ? red[700]
                      : neutral[500],
                }}
                variant="caption"
              >
                Remaining balance{' '}
                {watchReceive <= Number(wallet?.balance) / 1e6
                  ? formatSpn(Number(wallet?.balance) / 1e6 - watchReceive)
                  : formatSpn(Number(wallet?.balance) / 1e6)}{' '}
                SPN
              </Typography>
            </Box>
          </Box>
          <Box
            bgcolor={neutral[50]}
            borderRadius={10}
            marginTop={1}
            padding={1}
            textAlign="center"
          >
            <Typography
              style={{
                fontWeight: 100,
                color: neutral[500],
                textAlign: 'center',
              }}
              variant="caption"
            >
              Current exchange rate 1 SPN = $0.529
            </Typography>
          </Box>
        </div>
        {spnCurrentReceiver && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                fontWeight: 100,
                color: neutral[500],
                textAlign: 'center',
                lineHeight: 1.5,
              }}
              variant="caption"
            >
              Are you sure you want to proceed with this transaction?
            </Typography>
          </div>
        )}
      </div>
      <Box
        borderTop="1px solid #EDEEF0"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        paddingX={2.4}
        paddingY={2}
      >
        <Button
          fullWidth
          color="primary"
          disabled={loadingResponse}
          type="submit"
          variant="contained"
          onClick={async () => {
            setLoadingResponse(true);
            try {
              await wallet.transferSPN(
                me.id,
                spnCurrentReceiver.id,
                spnCurrentReceiver.publicAddress,
                watchReceive * 1e6
              );
              enqueueSnackbar('Success!', {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
              setLoadingResponse(false);
              dispatchWalletState({
                type: 'spnCurrentReceiver',
                payload: null,
              });
            } catch (error) {
              enqueueSnackbar('Something went wrong.', {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              });
            }
          }}
        >
          {loadingResponse ? 'Processing...' : 'Send SPN'}
        </Button>
      </Box>
    </Box>
  );
};

export default Receivers;
