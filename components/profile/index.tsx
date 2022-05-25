import { useState } from 'react';

// components
import PassportStatic from './PassportStatic';

enum View {
  Passport,
}

const ProfileOverlay = () => {
  const [view, setView] = useState(View.Passport);

  const renderView = () => {
    switch (view) {
      case View.Passport:
        return <PassportStatic />;
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {renderView()}
    </div>
  );
};

export default ProfileOverlay;
