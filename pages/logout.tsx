import { useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const { query } = useRouter();
  const { clearSession, me } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      if (me) {
        try {
          await logout({ email: me.email });
        } catch (err) {
          Sentry.captureException(err);
        }
      }

      clearSession((query?.redirect as string) ?? undefined);
    };

    logoutUser();
  }, [clearSession, me, query?.redirect, toast]);

  return <></>;
};

export default LogoutPage;
