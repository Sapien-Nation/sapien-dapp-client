import { useState } from 'react';

enum View {
  Confirm,
  Home,
  Loading,
  Owners,
}
const UpgradeView = () => {
  const [view] = useState(View.Home);

  const renderView = () => {
    switch (view) {
      case View.Confirm:
        return <h1>https://sapienteam.atlassian.net/browse/PVD-220</h1>;
      case View.Home:
        return <h1>https://sapienteam.atlassian.net/browse/PVD-217</h1>;
      case View.Owners:
        return <h1>https://sapienteam.atlassian.net/browse/PVD-219</h1>;
      case View.Loading:
        return <h1>https://sapienteam.atlassian.net/browse/PVD-222</h1>;
    }
  };

  return <div>{renderView()}</div>;
};

export default UpgradeView;
