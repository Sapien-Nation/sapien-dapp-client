import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

const VerifyPage = () => {
  const {
    push,
    query: { token },
  } = useRouter();
  const { verifyUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const handleVerify = async () => {
      try {
        await verifyUser(token as string);
      } catch (error) {
        enqueueSnackbar(error);
      }
      push('/');
    };

    if (token) {
      handleVerify();
    }
  }, [token]);

  return <h1>Verifying...</h1>;
};

export default VerifyPage;
