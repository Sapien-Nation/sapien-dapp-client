import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';

// context
import { useAuth } from 'context/user';

// assets
import {
  Checkbox as CheckboxIcon,
  CheckboxChecked as CheckboxCheckedIcon,
} from 'assets';

// mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from '@material-ui/core';

// components
import { ChartCount } from 'components/common';

const Signup = () => {
  const authMethods = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    watch,
  } = useForm();

  const onSubmit = async (values: {
    email: string;
    displayName: string;
    password: string;
    username: string;
  }) => {
    try {
      await authMethods.register({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/',
      });
    } catch (error) {
      Sentry.captureException(error);
      enqueueSnackbar(error);
    }
  };

  const currentUsername = watch('username');
  const currentDisplayName = watch('displayName');

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        id="email"
        inputProps={{ ...register('email'), autoComplete: 'email' }}
        label="Email or phone number"
        placeholder="myemailaddress@email.com"
        type="email"
      />
      <TextField
        fullWidth
        required
        id="username"
        inputProps={{ ...register('username'), autoComplete: 'username' }}
        label={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="buttonMedium">Username*</Typography>
            <ChartCount currentCount={currentUsername?.length} maxCount={20} />
          </Box>
        }
        placeholder="johniedoe"
        type="text"
      />
      <TextField
        fullWidth
        required
        id="displayName"
        inputProps={{ ...register('displayName'), autoComplete: 'name' }}
        label={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="buttonMedium">Name*</Typography>
            <ChartCount
              currentCount={currentDisplayName?.length}
              maxCount={20}
            />
          </Box>
        }
        placeholder="Jonathan Doe"
        type="text"
      />
      <TextField
        fullWidth
        required
        InputLabelProps={{ style: { pointerEvents: 'auto' } }}
        id="password"
        inputProps={{ ...register('password'), autoComplete: 'new-password' }}
        label={
          <>
            <Typography variant="buttonMedium">Password*</Typography>
            <FormHelperText style={{ margin: 0 }}>
              Minimum length is 8 characters. Must include at least 1 alpha, 1{' '}
              <br />
              numeric, 1 lowercaps, and 1 highercaps.
            </FormHelperText>
          </>
        }
        placeholder="mypassword123*"
        type="password"
      />
      <Box marginBottom="2rem">
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              required
              checkedIcon={<CheckboxCheckedIcon />}
              color="default"
              icon={<CheckboxIcon />}
              name="agree"
            />
          }
          label={
            <Box alignItems="baseline" display="flex">
              <Typography variant="subtitle2">
                I have read and agree to the
              </Typography>
              <Link passHref href="https://common.sapien.network/terms.html">
                <Typography
                  component="a"
                  style={{
                    marginLeft: '4px',
                  }}
                  target="_blank"
                  variant="buttonSmall"
                >
                  Terms & Conditions
                </Typography>
              </Link>
            </Box>
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              disableRipple
              required
              checkedIcon={<CheckboxCheckedIcon />}
              color="default"
              icon={<CheckboxIcon />}
              name="wallet"
            />
          }
          label={
            <Typography variant="subtitle2">
              I understand that a wallet will be created for me
            </Typography>
          }
        />
      </Box>

      <Button
        fullWidth
        color="primary"
        disabled={isSubmitting}
        type="submit"
        variant="contained"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
