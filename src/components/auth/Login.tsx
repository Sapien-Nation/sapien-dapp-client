/* istanbul ignore file */

import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

//components
import { TextInput, Checkbox } from 'components/form';

const Login = () => {
  const { register, errors } = useFormContext();

  return (
    <>
      <Box marginY="5rem">
        <Typography variant="h1">Log in</Typography>
      </Box>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={register({ required: 'Email is required', maxLength: 36 })}
        label="Email, phone number, or username"
        name="username"
        placeholder="myemailaddress@email.com"
      />
      <TextInput
        fullWidth
        autoComplete="new-password"
        errors={errors}
        inputRef={register({ required: 'Password is required', maxLength: 36 })}
        label="Password"
        name="password"
        placeholder="mypassword123*"
        spacing="6px"
        type="password"
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom="2rem"
      >
        <Checkbox
          errors={errors}
          label={<Typography variant="subtitle1">Remember me</Typography>}
          name="remember"
        />
        <Link passHref href="/auth#forgot">
          <Typography color="primary" variant="h4">
            Forgot password?
          </Typography>
        </Link>
      </Box>

      <Button fullWidth color="primary" type="submit" variant="contained">
        Log In
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem"
      >
        <>
          <Typography variant="subtitle2">Don’t have an account?</Typography>
          <Link href="/auth#signup">
            <Typography
              style={{
                cursor: 'pointer',
                marginLeft: '4px',
              }}
              variant="subtitle1"
            >
              Sign up
            </Typography>
          </Link>
        </>
      </Box>
    </>
  );
};

export default Login;
