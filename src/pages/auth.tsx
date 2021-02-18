/* istanbul ignore file */
import { useState } from 'react';

// next
import { useRouter } from 'next/router';

// mui
import { CssBaseline } from '@material-ui/core';

// styles
import { darkPurple } from 'styles/colors';

// components
import { Login, Signup } from 'components/auth';

enum View {
  Login,
  Signup
}

const AuthPage = () => {
  const { asPath, events } = useRouter();

  const [view, setView] = useState(() =>
    asPath?.includes('#signup') ? View.Signup : View.Login
  );

  const renderView = () => {
    switch (view) {
      case View.Login:
        return <Login />;
      default:
        return <Signup />;
    }
  };

  events?.on('hashChangeComplete', (url) => {
    setView(url.includes('#signup') ? View.Signup : View.Login);
  });
  return (
    <>
      <CssBaseline />
      <div
        style={{ display: 'grid', height: '100vh', gridTemplateColumns: '1fr 1fr' }}
      >
        <div style={{ backgroundColor: darkPurple }}></div>
        <div>{renderView()}</div>
      </div>
    </>
  );
};

export default AuthPage;
