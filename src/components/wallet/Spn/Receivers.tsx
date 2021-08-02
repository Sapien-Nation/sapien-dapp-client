import { useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

// components
import SearchInput from '../shared/SearchInput';

// mui
import {
  Avatar,
  Box,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// styles
import { red, neutral } from 'styles/colors';

// utils
import { formatSpn, formatSpnToUsd } from 'utils/spn';

// assets
import { Spn as SpnIcon } from 'assets';

// enums
import { MyBadgesSteps } from '../WalletEnums';

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

export const ReceiverItem = ({
  description,
  name,
  setCurrentReceiver,
  setStep,
}) => {
  const classes = useStyles();
  return (
    <Box
      alignItems="center"
      borderRadius={10}
      className={classes.receiverItem}
      display="flex"
      marginTop={1}
      padding={1}
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        setStep(MyBadgesSteps.Confirmation);
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
  console.log('HOLA!');
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

const Receivers = ({ setShowTabsMenu, setCurrentReceiver }) => {
  const {
    watch,
    register,
    formState: { isDirty },
  } = useFormContext();
  const watchReceive = watch('receive');
  const classes = useStyles();
  return (
    <div
      style={{
        padding: '2rem 2.4rem',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '42px 50px 1fr 188px',
      }}
    >
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <IconButton
          aria-label="go back"
          style={{
            padding: 0,
            marginRight: 6,
            marginBottom: 10,
          }}
          onClick={() => {
            setShowTabsMenu(true);
          }}
        >
          <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
        </IconButton>
        <Typography variant="button">Receiver</Typography>
      </div>
      <SearchInput
        ItemComponent={ReceiverItem}
        list={mockList}
        setCurrentReceiver={setCurrentReceiver}
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
          will receive
        </Typography>
        <br />
        <SpnIcon style={{ marginRight: 10 }} />
        <Input
          classes={{
            root: classes.amountInput,
            focused: classes.amountInputFocus,
          }}
          endAdornment={
            <InputAdornment position="end" style={{ color: neutral[700] }}>
              SPN{' '}
              <small
                style={{
                  marginLeft: 10,
                  color: neutral[500],
                  fontSize: 12,
                  fontWeight: 100,
                }}
              >
                {formatSpnToUsd(watchReceive)}
              </small>
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
            width: 140 + String(watchReceive)?.length * 16,
          }}
        />
        <Box display="flex" justifyContent="space-between" marginTop={3}>
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
            Balance{' '}
            {watchReceive <= userBalance
              ? formatSpn(userBalance - watchReceive)
              : formatSpn(userBalance)}{' '}
            SPN
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Receivers;
