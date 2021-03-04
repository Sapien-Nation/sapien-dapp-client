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
      <Typography
        style={{
          margin: '5rem 0',
          fontSize: '3.2rem',
        }}
        variant="h2"
      >
        Forgotten Password
      </Typography>
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
          <Typography
            style={{
              fontSize: '1.2rem',
              color: black,
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            Remembered your password?
          </Typography>
          <Link href="/auth#login">
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
        </>
      </Box>
    </>
  );
};

export default Forgot;
