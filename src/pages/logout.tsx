import { useEffect } from 'react';

// api
import { logout } from 'api/authentication';

// context
import { useAuth } from 'context/user';

const LogoutPage = () => {
  const { clearSession, me } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await logout({ email: me.email });
      } catch (err) {
        console.error(err);
      }
    };

    if (me) {
      logoutUser();
    }

    clearSession();
  }, [me]);

  return <></>;
};

export default LogoutPage;
