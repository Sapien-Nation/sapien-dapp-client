/* istanbul ignore file */
import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// styles
import { black } from 'styles/colors';

//components
import { TextInput } from 'components/form';

const Forgot = () => {
  const { register, errors } = useFormContext();

  return (
    <>
      <Box marginY="5rem">
        <Typography variant="h1">Forgotten Password</Typography>
      </Box>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={register({ required: 'Email is required' })}
        label="Email, phone number, or username"
        name="username"
        placeholder="Enter your email, phone number, or username"
      />

      <Button fullWidth color="primary" type="submit" variant="contained">
        Send request
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem"
      >
        <>
          <Typography color="textPrimary" variant="subtitle2">
            Remembered your password?
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
        </>
      </Box>
    </>
  );
};

export default Forgot;
