/* istanbul ignore file */

import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/node';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// context
import { useAuth } from 'context/user';

// components
import { TextInput, Checkbox, PasswordStrengthInput } from 'components/common';

const Signup = () => {
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    unregister,
    register,
    setValue,
    watch,
  } = useForm();
  const { register: signup } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { ref: emailRef, ...emailRest } = register('email', {
    required: 'Email is required',
    maxLength: 36,
  });
  const { ref: usernameRef, ...usernameRest } = register('username', {
    required: 'Username is required',
    maxLength: 20,
  });
  const { ref: nameRef, ...nameRest } = register('name', {
    required: 'Name is required',
    maxLength: 20,
  });
  const { ref: confirmPasswordRef, ...confirmPasswordRest } = register(
    'confirm',
    {
      required: 'Password is required',
      maxLength: 36,
      validate: (val = '') =>
        val === getValues('password') || 'Passwords don"t match',
    }
  );

  const onSubmit = async () => {
    try {
      await signup();
    } catch (err) {
      Sentry.captureException(err);
      enqueueSnackbar('An error occurred, please try again');
    }
  };

  const currentUsername = watch('username');
  const currentName = watch('name');

  return (
    <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <Box marginY="5rem">
        <Typography variant="h1">Sign up</Typography>
      </Box>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={emailRef}
        label="Email or phone number"
        placeholder="myemailaddress@email.com"
        {...emailRest}
      />
      <TextInput
        fullWidth
        autoComplete="username"
        chartCount="20"
        currentChartCount={currentUsername?.length}
        errors={errors}
        inputRef={usernameRef}
        label="Username"
        placeholder="johniedoe"
        tooltipText="Set a username"
        {...usernameRest}
      />
      <TextInput
        fullWidth
        autoComplete="name"
        chartCount="20"
        currentChartCount={currentName?.length}
        errors={errors}
        inputRef={nameRef}
        label="Name"
        placeholder="Jonathan Doe"
        {...nameRest}
      />
      <PasswordStrengthInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        label="Password"
        name="password"
        placeholder="mypassword123*"
        register={register}
        setValue={setValue}
        tooltipText="Minimum length is 8 characters. Must include at least 
        1 alpha, 1 numeric, 1 lowercaps,  and 1 highercaps."
        unregister={unregister}
        watch={watch}
      />
      <TextInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        inputRef={confirmPasswordRef}
        label="Confirm password"
        name="confirm"
        placeholder="mypassword123*"
        type="password"
        {...confirmPasswordRest}
      />
      <Box display="flex" flexDirection="column" marginBottom="2rem">
        <Checkbox
          errors={errors}
          label={
            <>
              <Typography variant="subtitle2">
                I have read and agree to the
              </Typography>
              <Link passHref href="/auth#signup">
                <Typography
                  style={{
                    color: '#4bd0df',
                    marginLeft: '4px',
                  }}
                  variant="subtitle1"
                >
                  Terms & Conditions
                </Typography>
              </Link>
            </>
          }
          name="agree"
        />
        <Checkbox
          errors={errors}
          label={
            <Typography variant="subtitle2">
              I understand that a wallet will be created for me
            </Typography>
          }
          name="wallet"
        />
      </Box>

      <Button fullWidth color="primary" type="submit" variant="contained">
        Sign up
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem"
      >
        <Typography
          style={{
            cursor: 'pointer',
          }}
          variant="subtitle2"
        >
          Already have an account?
        </Typography>
        <Link href="/auth#login">
          <Typography
            style={{
              cursor: 'pointer',
              marginLeft: '4px',
            }}
            variant="subtitle1"
          >
            Log in
          </Typography>
        </Link>
      </Box>
    </form>
  );
};

export default Signup;
