/* istanbul ignore file */
import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

//components
import { TextInput } from 'components/form';

const Forgot = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref, ...rest } = register('username', {
    required: 'Email is required',
  });
  return (
    <>
      <Box marginY="5rem">
        <Typography variant="h1">Forgotten Password</Typography>
      </Box>
      <TextInput
        fullWidth
        autoComplete="email"
        errors={errors}
        inputRef={ref}
        label="Email, phone number, or username"
        placeholder="Enter your email, phone number, or username"
        {...rest}
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
