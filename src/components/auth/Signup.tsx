// next
import { useRouter } from 'next/router';

// mui
import { Button } from '@material-ui/core';

const Signup = () => {
  const { push } = useRouter();

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => push('/auth#login', undefined, { shallow: false })}
    >
      Login
    </Button>
  );
};

export default Signup;
