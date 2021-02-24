/* istanbul ignore file */

import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// styles
import { black, purple } from 'styles/colors';

//components
import { TextInput, Checkbox } from 'components/form';

const Login = () => {
  const { register, errors } = useFormContext();

  return (
    <>
      <Typography
        style={{
          margin: '5rem 0',
          fontSize: '3.2rem',
        }}
        variant="h2"
      >
        Log in
      </Typography>
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Email, phone number, or username"
        name="username"
        placeholder="myemailaddress@email.com"
      />
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
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
        <Checkbox errors={errors} label="Remember me" name="remember" />
        <Link passHref href="/auth#forgot">
          <Typography
            style={{
              color: purple,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
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
        <Link passHref href="/auth#signup">
          <>
            <Typography
              style={{
                fontSize: '1.2rem',
                color: black,
                fontWeight: 400,
                cursor: 'pointer',
              }}
            >
              Don’t have an account?
            </Typography>
            <Typography
              style={{
                fontSize: '1.2rem',
                color: black,
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: '4px',
              }}
            >
              Sign up
            </Typography>
          </>
        </Link>
      </Box>
    </>
  );
};

export default Login;
