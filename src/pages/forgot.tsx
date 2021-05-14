import { useState } from 'react';

// components
import Layout from './AuthLayout';
import { ForgotForm, SuccessScreen } from 'components/authentication';

enum View {
  Form,
  Success,
}

const ForgotPage = () => {
  const [view, setView] = useState(View.Form);

  const renderView = () => {
    switch (view) {
      case View.Form:
        return <ForgotForm setView={() => setView(View.Success)} />;
      case View.Success:
        return <SuccessScreen setView={() => setView(View.Form)} />;
    }
  };

  return <>{renderView()}</>;
};

ForgotPage.Layout = Layout;

export default ForgotPage;
