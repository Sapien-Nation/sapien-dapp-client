import { useState } from 'react';

// components
import Passport from './Passport';

enum View {
  Passport,
}

const ProfileOverlay = () => {
  const [view, setView] = useState(View.Passport);

  const renderView = () => {
    switch (view) {
      case View.Passport:
        return <Passport />;
    }
  };

  return <div>{renderView()}</div>;
};

export default ProfileOverlay;
