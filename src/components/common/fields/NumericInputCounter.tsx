// mui
import { Box, IconButton, TextField } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

// styles
import { neutral } from 'styles/colors';

const NumericInputCounter = ({ watchBadgesAmount, setValue, register }) => {
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
        aria-label="Decrement amount"
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
          ...register('badgesAmount'),
        }}
        label=""
        style={{
          marginBottom: 0,
        }}
        type="number"
      />
      <IconButton
        aria-label="Increment amount"
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

export default NumericInputCounter;
