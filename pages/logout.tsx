import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';

// api
import { logout } from 'api/authentication';

// context
import { useAuth } from 'context/user';

// types
import { NextPage } from 'next';

const LogoutPage: NextPage = () => {
  const { query } = useRouter();
  const { clearSession, me } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      if (me) {
        try {
          await logout({ email: me.email });
        } catch (err) {
          Sentry.captureMessage(err);
        }
      }

      clearSession((query?.redirect as string) ?? undefined);
    };

    setTimeout(() => {
      logoutUser();
    }, 2000);
  }, [clearSession, me, query?.redirect]);

  return (
    <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
          alt="People working on laptops"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
      </div>
      <div className="relative flex justify-center items-center flex-col h-full w-full gap-4">
        <h4 className="text-3xl sm:text-5xl font-bold ">See you later 👋</h4>
      </div>
    </div>
  );
};

export default LogoutPage;
