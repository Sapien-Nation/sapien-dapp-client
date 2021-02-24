/* istanbul ignore file */

import { useFormContext } from 'react-hook-form';

// next
import Link from 'next/link';

// mui
import { Box, Button, Typography } from '@material-ui/core';

// styles
import { black, purple } from 'styles/colors';

//components
import { TextInput, Checkbox, PasswordStrengthInput } from 'components/form';

const Signup = () => {
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
        Sign up
      </Typography>
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Email or phone number"
        name="email"
        placeholder="myemailaddress@email.com"
      />
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Username"
        name="username"
        placeholder="johniedoe"
      />
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Name"
        name="name"
        placeholder="Jonathan Doe"
      />
      <PasswordStrengthInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Password"
        name="password"
        placeholder="mypassword123*"
        tooltipText="Minimum length is 8 characters. Must include at least 
        1 alpha, 1 numeric, 1 lowercaps,  and 1 highercaps."
      />
      <TextInput
        fullWidth
        errors={errors}
        inputRef={register({ required: 'This is required', maxLength: 36 })}
        label="Confirm password"
        name="confirm"
        placeholder="mypassword123*"
        spacing="6px"
        type="password"
      />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginBottom="2rem"
      >
        <Checkbox
          errors={errors}
          label="I have read and agree to the Terms & Conditions"
          name="agree"
        />
        <Checkbox
          errors={errors}
          label="I understand that a wallet will be created for me"
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
              Already have an account?
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
              Log in
            </Typography>
          </>
        </Link>
      </Box>
    </>
  );
};

export default Signup;
