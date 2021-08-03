import { useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

// components
import SearchInput from '../shared/SearchInput';

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

// assets
import { Spn as SpnIcon } from 'assets';

const mockList = [
  {
    name: 'Member 1',
    description: '@member1',
  },
  {
    name: 'Member 2',
    description: '@member2',
  },
  {
    name: 'Member 3',
    description: '@member3',
  },
  {
    name: 'Member 5',
    description: '@member4',
  },
  {
    name: 'Member 5',
    description: '@member5',
  },
];

const minSpn = 99;
const userBalance = 15000;

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

export const ReceiverItem = ({ description, name, setCurrentReceiver }) => {
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
        setCurrentReceiver({
          name,
          description,
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
        <Typography variant="button">{name}</Typography>
      </Box>
      <Box alignItems="center" display="flex">
        <Typography style={{ marginLeft: 6 }} variant="button">
          {description}
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

const Receivers = ({ currentReceiver, setCurrentReceiver }) => {
  const {
    watch,
    register,
    formState: { isDirty },
  } = useFormContext();
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
          gridTemplateRows: currentReceiver
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
          {currentReceiver ? (
            <>
              <IconButton
                aria-label="go back"
                style={{
                  padding: 0,
                  marginRight: 6,
                }}
                onClick={() => {
                  setCurrentReceiver(null);
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
        {currentReceiver ? (
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
              <Typography variant="button">{currentReceiver.name}</Typography>
              <Typography variant="overline">@marryrob</Typography>
            </Box>
          </Box>
        ) : (
          <SearchInput
            ItemComponent={ReceiverItem}
            list={mockList}
            setCurrentReceiver={setCurrentReceiver}
          />
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
                {isDirty && watchReceive < minSpn ? 'Minimum 100 SPN' : null}
              </Typography>
              <Typography
                style={{
                  fontWeight: 100,
                  color: userBalance < watchReceive ? red[700] : neutral[500],
                }}
                variant="caption"
              >
                Remaining balance{' '}
                {watchReceive <= userBalance
                  ? formatSpn(userBalance - watchReceive)
                  : formatSpn(userBalance)}{' '}
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
        {currentReceiver && (
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
          type="submit"
          variant="contained"
          onClick={() => {
            setCurrentReceiver(null);
          }}
        >
          Send SPN
        </Button>
      </Box>
    </Box>
  );
};

export default Receivers;
