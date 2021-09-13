import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// assets
import { Store as StoreIcon } from 'assets';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

// components
import { NumericInputCounter } from 'components/common';

// context
import { useAuth } from 'context/user';
import { useWallet } from 'context/wallet';

// emums
import { StoreSteps } from '../WalletEnums';

const Confirmation = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const watchBadgesAmount = watch('badgesAmount');
  const { me } = useAuth();
  const { dispatchWalletState, globalWalletState } = useWallet();
  const { storeCurrentBadge } = globalWalletState;

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column" paddingX={2.4} paddingY={2}>
        <div style={{ display: 'flex' }}>
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
                  showTabsMenu: true,
                  storeStep: StoreSteps.Badges,
                },
              });
            }}
          >
            <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
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
          <Avatar alt={me.username}>{me.firstName?.[0]?.toUpperCase()}</Avatar>
          <Box display="flex" flexDirection="column" marginLeft={1}>
            <Typography variant="button">You</Typography>
          </Box>
          <IconButton
            aria-label="close"
            style={{
              padding: 0,
              marginLeft: 'auto',
            }}
            type="submit"
            onClick={() => {
              dispatchWalletState({
                type: 'update',
                payload: {
                  showTabsMenu: true,
                  storeStep: StoreSteps.Badges,
                },
              });
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
        >
          <Avatar
            alt=""
            imgProps={{
              style: {
                borderRadius: 40,
                padding: 3,
              },
            }}
            src={storeCurrentBadge.avatar}
            style={{
              width: 40,
              height: 40,
              border: `2px solid ${primary[800]}`,
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={1}>
            <Typography variant="button">{storeCurrentBadge.name}</Typography>
            <Typography
              style={{
                color: neutral[500],
                lineHeight: 1,
              }}
              variant="overline"
            >
              {storeCurrentBadge.description}
            </Typography>
          </Box>
          <Box alignItems="center" display="flex" marginLeft="auto">
            <NumericInputCounter
              name="badgesAmount"
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
      </Box>
      <div style={{ padding: 24, borderTop: '1px solid #EDEEF0' }}>
        <Button fullWidth color="primary" type="submit" variant="contained">
          <StoreIcon style={{ fill: '#FFF', marginRight: 7, zoom: '80%' }} />{' '}
          {storeCurrentBadge.spn * watchBadgesAmount} SPN
        </Button>
      </div>
    </Box>
  );
};

export default Confirmation;
