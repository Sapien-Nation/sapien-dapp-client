/* istanbul ignore file */

import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// styles
import { black } from 'styles/colors';

//components
import { TextInput, Checkbox, PasswordStrengthInput } from 'components/form';

const Signup = () => {
  const { register, errors, getValues } = useFormContext();

  return (
    <>
      <Typography
        style={{
          margin: '5rem 0',
          fontSize: '3.2rem',
        }}
        variant="h2"
      >
        Sign up
      </Typography>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={register({ required: 'Email is required', maxLength: 36 })}
        label="Email or phone number"
        name="email"
        placeholder="myemailaddress@email.com"
      />
      <TextInput
        fullWidth
        autoComplete="username"
        chartCount="20"
        errors={errors}
        inputRef={register({ required: 'Username is required', maxLength: 20 })}
        label="Username"
        name="username"
        placeholder="johniedoe"
        tooltipText="Set a username"
      />
      <TextInput
        fullWidth
        autoComplete="name"
        chartCount="20"
        errors={errors}
        inputRef={register({ required: 'Name is required', maxLength: 20 })}
        label="Name"
        name="name"
        placeholder="Jonathan Doe"
      />
      <PasswordStrengthInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        inputRef={register}
        label="Password"
        name="password"
        placeholder="mypassword123*"
        tooltipText="Minimum length is 8 characters. Must include at least 
        1 alpha, 1 numeric, 1 lowercaps,  and 1 highercaps."
      />
      <TextInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        inputRef={register({
          required: 'Password is required',
          maxLength: 36,
          validate: (val = '') =>
            val === getValues('password') || 'Passwords don"t match',
        })}
        label="Confirm password"
        name="confirm"
        placeholder="mypassword123*"
        type="password"
      />
      <Box display="flex" flexDirection="column" marginBottom="2rem">
        <Checkbox
          errors={errors}
          label={
            <>
              <Typography
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 400,
                }}
              >
                I have read and agree to the
              </Typography>
              <Link passHref href="/auth#signup">
                <Typography
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#4bd0df',
                    marginLeft: '4px',
                  }}
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
            <Typography
              style={{
                fontSize: '1.2rem',
                fontWeight: 400,
              }}
            >
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
            fontSize: '1.2rem',
            color: black,
            fontWeight: 400,
            cursor: 'pointer',
          }}
        >
          Already have an account?
        </Typography>
        <Link passHref href="/auth#login">
          <Typography
            style={{
              fontSize: '1.2rem',
              color: black,
              fontWeight: 700,
              cursor: 'pointer',
              marginLeft: '4px',
            }}
          >
            Log in
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default Signup;
