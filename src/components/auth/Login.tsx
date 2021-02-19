/* istanbul ignore file */
// context
import { useAuth } from 'context/user';

// next
import { useRouter } from 'next/router';

// mui
import { Button } from '@material-ui/core';

const Login = () => {
  const { login } = useAuth();
  const { push } = useRouter();

  return (
    <>
      <Button variant="contained" onClick={login}>
        Login
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => push('/auth#signup', undefined, { shallow: false })}
      >
        Signup
      </Button>
    </>
  );
};

export default Login;
