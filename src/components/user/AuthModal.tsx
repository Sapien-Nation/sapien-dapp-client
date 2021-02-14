import { useState } from 'react';

// components
import Dialog from 'components/dialog';

interface Props {
  onClose: () => void;
  open: boolean;
  handleLogin: () => void;
}

enum View {
  Login,
  Signup
}

const AuthModal: React.FC<Props> = ({ handleLogin, onClose, open }) => {
  const [view] = useState(View.Login);

  const getDialogProps = () => {
    switch (view) {
      case View.Login:
        return {
          confirmLabel: 'Login',
          onConfirm: handleLogin,
          title: 'Login'
        };
      default:
        return {
          title: ''
        };
    }
  };

  return <Dialog open={open} onClose={onClose} {...getDialogProps()} />;
};

export default AuthModal;
