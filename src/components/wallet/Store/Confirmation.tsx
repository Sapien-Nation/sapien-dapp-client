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
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';

// types
import type { Badge as BadgeType } from 'tools/types/wallet/badge';

// emums
import { StoreSteps } from '../WalletEnums';

interface Props {
  currentBadge: BadgeType;
  setShowTabsMenu: (showTab: boolean) => void;
  setStep: (step: StoreSteps) => void;
}

const Confirmation = ({ currentBadge, setShowTabsMenu, setStep }: Props) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const watchBadgesAmount = watch('badgesAmount');

  const NumericInputCounter = () => {
    const handleIncrement = () => {
      setValue('badgesAmount', Number(watchBadgesAmount) + 1, {
        shouldValidate: true,
      });
    };

    const handleDecrement = () => {
      if (Number(watchBadgesAmount) < 2) return;
      setValue('badgesAmount', Number(watchBadgesAmount) - 1, {
        shouldValidate: true,
      });
    };

    return (
      <Box alignItems="center" display="flex">
        <IconButton
          disabled={Number(watchBadgesAmount) < 2}
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
              width:
                36 +
                (String(watchBadgesAmount)?.length > 1 &&
                  String(watchBadgesAmount)?.length) *
                  5,
              padding: '1rem 1.2rem',
              height: 34,
              minHeight: 32,
              backgroundColor: '#FFF',
              margin: '0 1rem',
            },
          }}
          id="badges-amount"
          inputProps={{
            ...register('badgesAmount', {
              validate: {
                positive: (value: string) => {
                  if (parseInt(value) < 1 || !value) {
                    return 'Value should be more than 0';
                  } else if (value.length > 2) {
                    return 'Max badges amount is 99';
                  } else {
                    return true;
                  }
                },
              },
            }),
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
              setShowTabsMenu(true);
              setStep(StoreSteps.Badges);
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
            type="submit"
            onClick={() => {
              setShowTabsMenu(true);
              setStep(StoreSteps.Badges);
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
            src="/fixtures/normal/slowpoke.jpg"
            style={{
              width: 40,
              height: 40,
              border: `2px solid ${primary[800]}`,
            }}
          />
          <Box display="flex" flexDirection="column" marginLeft={1}>
            <Typography variant="button">{currentBadge.name}</Typography>
            <Typography
              style={{
                color: neutral[500],
                lineHeight: 1,
              }}
              variant="overline"
            >
              {currentBadge.description}
            </Typography>
          </Box>
          <Box alignItems="center" display="flex" marginLeft="auto">
            <NumericInputCounter />
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
          {currentBadge.spn * watchBadgesAmount} SPN
        </Button>
      </div>
    </Box>
  );
};

export default Confirmation;
