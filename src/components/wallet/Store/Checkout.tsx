import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// assets
import {
  Checkbox as CheckboxIcon,
  CheckboxChecked as CheckboxCheckedIcon,
} from 'assets';

// context
import { useWallet } from 'context/wallet';

// styles
import { primary, neutral } from 'styles/colors';

// mui
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// emums
import { StoreSteps } from '../WalletEnums';

const Checkout = () => {
  const {
    formState: { errors },
    watch,
    control,
  } = useFormContext();
  const watchBadgesAmount = watch('badgesAmount');
  const { globalWalletState, dispatchWalletState } = useWallet();
  const { storeCurrentBadge } = globalWalletState;
  const renderFees = () => {
    return (
      <Box marginTop={3}>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body2">Badges cost</Typography>
          <Typography variant="body2">
            {storeCurrentBadge.spn * watchBadgesAmount} SPN
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={1}>
          <Typography variant="body2">Transaction fee</Typography>
          <Typography variant="body2">5%</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" marginBottom={1.8}>
          <Typography style={{ fontWeight: 700 }} variant="body2">
            Total
          </Typography>
          <Typography style={{ color: primary[800] }} variant="body2">
            {storeCurrentBadge.spn * watchBadgesAmount + 5} SPN
          </Typography>
        </Box>
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
              dispatchWalletState({
                showTabsMenu: false,
                storeStep: StoreSteps.Confirmation,
              });
            }}
          >
            <ArrowBackIcon fontSize="small" style={{ color: neutral[700] }} />
          </IconButton>
          <Typography variant="button">Check Out</Typography>
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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{
            gap: 10,
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
              width: 64,
              height: 64,
              border: `2px solid ${primary[800]}`,
            }}
          />
          <Typography variant="subtitle1">
            Badge Name (x{watchBadgesAmount})
          </Typography>
          <Typography
            style={{ textAlign: 'center', color: neutral[500] }}
            variant="h6"
          >
            Velit sed turpis tellus curabitur sit habitant sit eget lorem ipsum.
          </Typography>
        </Box>
        {renderFees()}
        <Box
          bgcolor={neutral[50]}
          borderRadius={10}
          display="flex"
          justifyContent="center"
          paddingY={0.6}
        >
          <Typography style={{ color: neutral[500] }} variant="overline">
            Remaining balance: 3,082 SPN
          </Typography>
        </Box>
      </Box>
      <Box
        borderTop="1px solid #EDEEF0"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        paddingBottom={2.4}
        paddingX={2.4}
      >
        <Controller
          control={control}
          name="terms"
          render={({ field }) => {
            return (
              <div
                style={{
                  padding: '1rem 0',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      checkedIcon={<CheckboxCheckedIcon />}
                      color="default"
                      icon={<CheckboxIcon />}
                      name="terms"
                      {...field}
                    />
                  }
                  label={
                    <Typography>
                      <Typography style={{ fontWeight: 400 }} variant="button">
                        I agree to
                      </Typography>{' '}
                      <Typography variant="button">
                        <a
                          href="https://common.sapien.network/terms.html"
                          rel="noreferrer"
                          style={{ color: '#42D1E0' }}
                          target="_blank"
                        >
                          Terms & Conditions
                        </a>
                      </Typography>
                    </Typography>
                  }
                />
                {errors.terms && (
                  <FormHelperText className="Mui-error">
                    <ErrorMessage errors={errors} name="terms" />
                  </FormHelperText>
                )}
              </div>
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'Please Check the box',
            },
          }}
        />
        <Button
          fullWidth
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => {
            dispatchWalletState({
              type: 'showTabsMenu',
              payload: true,
            });
          }}
        >
          Purchase Token
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
