import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

// api
import { logout } from 'api/authentication';

// context
import { useAuth } from 'context/user';

// types
import { NextPage } from 'next';

// context
import { useToast } from 'context/toast';

const LogoutPage: NextPage = () => {
  const toast = useToast();
  const { clearSession, me } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      if (me) {
        try {
          await logout({ email: me.email });
        } catch (err) {
          Sentry.captureException(err);

          toast({
            message: err,
          });
        }
      }

      clearSession();
    };

    logoutUser();
  }, [clearSession, me, toast]);

  return <></>;
};

export default LogoutPage;
