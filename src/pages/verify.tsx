import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// api
import { verifyUser } from 'api/authentication';

const VerifyPage = () => {
  const {
    push,
    query: { token },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleVerify = async () => {
      try {
        await verifyUser(token as string);
      } catch (error) {
        enqueueSnackbar(error, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
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
