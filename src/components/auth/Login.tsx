/* istanbul ignore file */

import { Controller, useFormContext } from 'react-hook-form';

// context
import { useAuth } from 'context/user';

// next
import Link from 'next/link';

// mui
import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
  withStyles
} from '@material-ui/core';


// styles
import { black, purple } from 'styles/colors';

//components
import { PasswordInput, TextInput } from 'components/form';

const PurpleCheckbox = withStyles({
  root: {
    color: purple,
    '&$checked': {
      color: purple,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


const Login = () => {
  const { login } = useAuth();
  const { control, register } = useFormContext();

  return (
    <>
      <Typography
        style={{
          margin: '5rem 0',
          fontSize: '3.2rem'
        }}
        variant="h2"
      >
        Log in
      </Typography>
      <TextInput
        required
        label="Email, phone number, or username"
        maxLength={36}
        name="username"
        placeholder="myemailaddress@email.com"
      />
      <Controller
        control={control}
        name="password"
        render={({ onChange, name, value }) => (
          <PasswordInput
            inputRef={register()}
            label="Password"
            name={name}
            placeholder="Password"
            style={{ marginBottom: '0' }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom="2rem"
      >
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="remember"
              render={(props) => (
                <PurpleCheckbox
                  {...props}
                  checked={props.value}
                  onChange={(e) => props.onChange(e.target.checked)}
                />
              )}
            />
          }
          label={
            <Typography
              style={{
              fontSize: '1.2rem',
              fontWeight: 600
            }}>Remember me</Typography>
          }
        />
        <Link passHref href="/auth#forgot">
          <Typography
            style={{
              color: purple,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Forgot password?
          </Typography>
        </Link>
      </Box>

      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={login}
      >
        Log In
      </Button>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        marginTop="2rem">
        <Link passHref href="/auth#signup">
          <>
            <Typography
              style={{
                fontSize: '1.2rem',
                color: black,
                fontWeight: 400,
                cursor: 'pointer'
              }}>
              Don’t have an account?
            </Typography>
            <Typography
              style={{
                fontSize: '1.2rem',
                color: black,
                fontWeight: 700,
                cursor: 'pointer',
                marginLeft: '4px'
              }}>
              Sign up
            </Typography>
          </>
        </Link>
      </Box>
    </>
  );
};

export default Login;
