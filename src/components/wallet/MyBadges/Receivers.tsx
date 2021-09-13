import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// components
import Empty from './Empty';
import SearchInput from '../shared/SearchInput';
import TokenFetcher from '../shared/TokenFetcher';
import { Query, WalletSkeleton, NumericInputCounter } from 'components/common';

// mui
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// styles
import { primary, neutral } from 'styles/colors';

// context
import { useWallet } from 'context/wallet';

// enums
import { MyBadgesSteps } from '../WalletEnums';

const useStyles = makeStyles(() => ({
  receiverItem: {
    '&:hover': {
      backgroundColor: neutral[50],
    },
  },
}));

export const ReceiverItem = ({
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
      padding={1}
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        dispatchWalletState({
          type: 'update',
          payload: {
            myBadgesTransition: 'forward',
            myBadgesStep: MyBadgesSteps.Confirmation,
            myBadgesCurrentReceiver: {
              id,
              userName,
              displayName,
              publicAddress,
            },
          },
        });
      }}
    >
      <Avatar alt={userName}>{displayName?.[0]?.toUpperCase()}</Avatar>
      <Box display="flex" marginLeft={1}>
        <Typography variant="button">{displayName}</Typography>
      </Box>
      <Box alignItems="center" display="flex">
        <Typography
          style={{ marginLeft: 6, color: neutral[500] }}
          variant="button"
        >
          @{userName}
        </Typography>
      </Box>
    </Box>
  );
};

const Receivers = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { dispatchWalletState, globalWalletState } = useWallet();
  const { myBadgesCurrentBadge } = globalWalletState;
  const watchBadgesAmount = watch('badgesAmount');

  return (
    <div
      style={{
        padding: '2rem 2.4rem',
        height: '100%',
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
            dispatchWalletState({
              type: 'update',
              payload: {
                myBadgesTransition: 'back',
                showTabsMenu: true,
                myBadgesStep: MyBadgesSteps.Badges,
              },
            });
          }}
        >
          <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
        </IconButton>
        <Typography variant="button">Confirmation</Typography>
      </div>
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
            customHeight="326px"
            dispatchWalletState={dispatchWalletState}
            list={list}
            placeholder="Search for a receiver"
          />
        )}
      </Query>
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
          <Typography variant="button">{myBadgesCurrentBadge.name}</Typography>
          <Typography
            style={{
              color: neutral[500],
              lineHeight: 1,
            }}
            variant="overline"
          >
            {myBadgesCurrentBadge.description}
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" marginLeft="auto">
          <NumericInputCounter
            register={register}
            setValue={setValue}
            watchBadgesAmount={watchBadgesAmount}
          />
        </Box>
      </Box>
      {errors.badgesAmount && (
        <FormHelperText
          className="Mui-error"
          style={{ textAlign: 'center', margin: '1rem 0' }}
        >
          <ErrorMessage errors={errors} name="badgesAmount" />
        </FormHelperText>
      )}
    </div>
  );
};

export default Receivers;
