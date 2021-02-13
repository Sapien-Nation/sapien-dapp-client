import { useState } from 'react';
import { useSnackbar } from 'notistack';

// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// context
import { useAuth } from 'context/user';

const AuthModal = dynamic(() => import('components/user/AuthModal'), { ssr: false });

const General = () => {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { asPath, events, push } = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() =>
    asPath?.includes('#signup')
  );

  const handleLogin = async () => {
    try {
      // TODO TBD we can setup navigation/more auth stuff as needed
      await login();
      push(asPath.replace(/#signup/gi, ''), undefined, { shallow: false });
      setIsAuthModalOpen(false);
    } catch (err) {
      enqueueSnackbar(err.message);
    }
  };

  events.on('hashChangeComplete', (url) => {
    setIsAuthModalOpen(url.includes('#signup'));
  });

  return (
    <AuthModal
      handleLogin={handleLogin}
      open={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
    />
  );
};

export default General;
