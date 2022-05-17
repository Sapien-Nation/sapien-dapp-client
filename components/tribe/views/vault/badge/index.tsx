import { useState } from 'react';

enum View {
  Home,
}

const Badge = () => {
  const [view, setView] = useState(View.Home);

  //--------------------------------------------------------------------------
  const renderView = () => {
    switch (view) {
      case View.Home:
        return 'Home Badge View';
    }
  };

  return <>{renderView()}</>;
};

export default Badge;
