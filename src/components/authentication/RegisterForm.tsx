import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// api
import { register as registerAction } from 'api/authentication';

// assets
import {
  Checkbox as CheckboxIcon,
  CheckboxChecked as CheckboxCheckedIcon,
} from 'assets';

// context
import { useAuth } from 'context/user';

// components
import { ChartCount, PasswordField } from 'components/common';

// mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Tooltip,
  FormHelperText,
} from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';

// utils
import { EmailRegex, NameRegex, UsernameRegex } from 'utils/regex';

const Signup = () => {
  const { setSession } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const onSubmit = async (values: {
    displayName: string;
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const response = await registerAction({
        ...values,
        client: window?.navigator.userAgent,
        redirect: '/client/home',
      });

      setSession({
        torus: response.torus,
        token: response.token,
        refresh: response.refresh,
      });
    } catch (error) {
      enqueueSnackbar('Oops, something went wrong. Please try again', {
        variant: 'error',
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
        error={Boolean(errors.email)}
        helperText={
          <Box
            component="span"
            display="block"
            marginTop={0.5}
            textAlign="right"
          >
            <ErrorMessage errors={errors} name="email" />
          </Box>
        }
        id="email"
        inputProps={{
          ...register('email', {
            pattern: {
              value: EmailRegex,
              message: 'Invalid email address',
            },
            required: {
              value: true,
              message: 'Invalid email address',
            },
          }),
          autoComplete: 'email',
        }}
        label="Email"
        placeholder="myemailaddress@email.com"
      />
      <TextField
        fullWidth
        error={Boolean(errors.username)}
        helperText={
          <Box
            component="span"
            display="block"
            marginTop={0.5}
            textAlign="right"
          >
            <ErrorMessage errors={errors} name="username" />
          </Box>
        }
        id="username"
        inputProps={{
          ...register('username', {
            pattern: {
              value: UsernameRegex,
              message: 'Invalid username',
            },
            required: {
              value: true,
              message: 'Invalid username',
            },
            maxLength: {
              value: 20,
              message: 'Invalid username',
            },
          }),
          autoComplete: 'nickname',
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
        error={Boolean(errors.displayName)}
        helperText={
          <Box
            component="span"
            display="block"
            marginTop={0.5}
            textAlign="right"
          >
            <ErrorMessage errors={errors} name="displayName" />
          </Box>
        }
        id="displayName"
        inputProps={{
          autoComplete: 'name',
          ...register('displayName', {
            pattern: {
              value: NameRegex,
              message: 'Invalid name',
            },
            required: {
              value: true,
              message: 'Invalid name',
            },
            maxLength: {
              value: 40,
              message: 'Invalid name',
            },
          }),
        }}
        label={
          <Box display="flex" justifyContent="space-between">
            <Box alignItems="center" display="flex">
              Name{' '}
              <Tooltip
                arrow
                color="primary"
                placement="right"
                title={
                  <Box>
                    This is the name others will see. You can use:
                    <ul>
                      <li>Up to 20 characters</li>
                      <li>Letters and numbers</li>
                      <li>Spaces</li>
                    </ul>
                  </Box>
                }
              >
                <InfoIcon fontSize="small" style={{ marginLeft: '0.5rem' }} />
              </Tooltip>
            </Box>
            <ChartCount control={control} maxCount={40} name="displayName" />
          </Box>
        }
        placeholder="Jonathan Doe"
        type="text"
      />
      <PasswordField
        errors={errors}
        label={
          <Box alignItems="center" display="flex">
            Password{' '}
            <Tooltip
              arrow
              color="primary"
              placement="right"
              title={
                <Box>
                  Minimum length is 8 characters. Must include at least 1 alpha,
                  1 numeric, 1 lowercaps, and 1 highercaps.
                </Box>
              }
            >
              <InfoIcon
                color="action"
                fontSize="small"
                style={{ marginLeft: '0.5rem' }}
              />
            </Tooltip>
          </Box>
        }
        register={register}
      />
      <PasswordField
        isConfirm
        errors={errors}
        label="Confirm password"
        name="confirmPassword"
        register={register}
        watch={watch}
      />
      <Box marginBottom="2rem">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => {
            return (
              <>
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
                      <Typography variant="overline">
                        I have read and agree to the
                      </Typography>{' '}
                      <Typography variant="overline">
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
              </>
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'Please check to continue',
            },
          }}
        />
        <Controller
          control={control}
          name="wallet"
          render={({ field }) => {
            return (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      checkedIcon={<CheckboxCheckedIcon />}
                      color="default"
                      icon={<CheckboxIcon />}
                      name="wallet"
                      {...field}
                    />
                  }
                  label={
                    <Typography variant="overline">
                      I understand that a wallet will be created for me
                    </Typography>
                  }
                />
                {errors.wallet && (
                  <FormHelperText className="Mui-error">
                    <ErrorMessage errors={errors} name="wallet" />
                  </FormHelperText>
                )}
              </>
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'Please check to continue',
            },
          }}
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
