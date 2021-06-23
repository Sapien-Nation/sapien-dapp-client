import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

// api
import { register as registerAction } from 'api/authentication';

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
  const { setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: {
    email: string;
    displayName: string;
    password: string;
    username: string;
  }) => {
    try {
      const response = await registerAction({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/',
      });

      setSession({ torus: response.torus, token: response.token });
    } catch (error) {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        required
        id="email"
        inputProps={{
          ...register('email'),
          autoComplete: 'email',
        }}
        label="Email"
        placeholder="myemailaddress@email.com"
        type="email"
      />
      <TextField
        fullWidth
        required
        id="username"
        inputProps={{
          ...register('username'),
          autoComplete: 'username',
        }}
        label={
          <Box display="flex" justifyContent="space-between">
            Username
            <ChartCount control={control} maxCount={20} name="username" />
          </Box>
        }
        placeholder="johndoe"
        type="text"
      />
      <TextField
        fullWidth
        required
        id="displayName"
        inputProps={{
          autoComplete: 'name',
          title: 'Invalid Name',
          ...register('displayName'),
        }}
        label={
          <Box display="flex" justifyContent="space-between">
            Name
            <ChartCount control={control} maxCount={20} name="displayName" />
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
        inputProps={{
          ...register('password'),
          autoComplete: 'new-password',
          pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
        }}
        label={
          <>
            Password
            <FormHelperText style={{ margin: 0 }}>
              Minimum length is 8 characters. Must include at least an alpha, a{' '}
              <br />
              numeric, a lowercase and an uppercase.
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
              checkedIcon={<CheckboxCheckedIcon />}
              color="default"
              icon={<CheckboxIcon />}
              name="agree"
            />
          }
          label={
            <Typography>
              <Typography component="span" variant="subtitle2">
                I have read and agree to the
              </Typography>{' '}
              <Typography component="span" variant="subtitle2">
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
