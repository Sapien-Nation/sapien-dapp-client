import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';

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
  const { handleSubmit, register, watch } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar('An error occurred, please try again');
    }
  };

  const currentUsername = watch('username');
  const currentName = watch('name');

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        InputProps={{ ...register('email') }}
        label="Email or phone number"
        placeholder="myemailaddress@email.com"
      />
      <TextField
        fullWidth
        required
        InputProps={{ ...register('username') }}
        autoComplete="username"
        label={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="buttonMedium">Username*</Typography>
            <ChartCount currentCount={currentUsername?.length} maxCount={20} />
          </Box>
        }
        placeholder="johniedoe"
      />
      <TextField
        fullWidth
        required
        InputProps={{ ...register('name') }}
        autoComplete="name"
        label={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="buttonMedium">Name</Typography>
            <ChartCount currentCount={currentName?.length} maxCount={20} />
          </Box>
        }
        placeholder="Jonathan Doe"
      />
      <TextField
        fullWidth
        required
        InputLabelProps={{ style: { pointerEvents: 'auto' } }}
        InputProps={{ ...register('password') }}
        autoComplete="new-password"
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

      <Button fullWidth color="primary" type="submit" variant="contained">
        Sign up
      </Button>
    </form>
  );
};

export default Signup;
