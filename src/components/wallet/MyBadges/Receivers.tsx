import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// components
import SearchInput from '../shared/SearchInput';

// mui
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';

// styles
import { primary, neutral } from 'styles/colors';

// enums
import { MyBadgesSteps } from '../WalletEnums';

export const ReceiverItem = ({ name, spn }) => (
  <Box
    alignItems="center"
    borderRadius={10}
    display="flex"
    marginTop={1}
    padding={1}
    style={{
      cursor: 'pointer',
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
        {spn}
      </Typography>
    </Box>
  </Box>
);

const Receivers = ({ setShowTabsMenu, setStep }) => {
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
    <div
      style={{
        padding: '2.4rem',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '32px 50px 1fr 86px',
      }}
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
            setStep(MyBadgesSteps.Badges);
          }}
        >
          <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
        </IconButton>
        <Typography variant="button">Confirmation</Typography>
      </div>
      <SearchInput ItemComponent={ReceiverItem} />
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
