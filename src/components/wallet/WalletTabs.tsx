import { useState } from 'react';

// mui
import { Tabs, Tab, makeStyles } from '@material-ui/core';

// styles
import { primary } from 'styles/colors';

// assets
import {
  Spn as SpnIcon,
  Tokens as TokensIcon,
  Store as StoreIcon,
} from 'assets';

// components
import { Store } from './';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
    minHeight: 0,
    opacity: '0.5',
    filter: 'grayscale(1)',
    '&.Mui-selected': {
      filter: 'none',
    },
  },
  wrapper: {
    flexDirection: 'row',
  },
}));

enum WalletTab {
  MyBadges = 0,
  Spn,
  Store,
}

const WalletTabs = () => {
  const [currentTab, setCurrentTab] = useState(WalletTab.MyBadges);
  const [showTabsMenu, setShowTabsMenu] = useState(true);
  const classes = useStyles();
  const handleChange = (_, tab) => {
    setCurrentTab(tab);
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case WalletTab.MyBadges: {
        return (
          <div
            style={{
              padding: '0 2.4rem',
            }}
          >
            My Badges
          </div>
        );
      }
      case WalletTab.Spn: {
        return (
          <div
            style={{
              padding: '0 2.4rem',
            }}
          >
            SPN
          </div>
        );
      }
      case WalletTab.Store: {
        return (
          <Store
            setShowTabsMenu={setShowTabsMenu}
            showTabsMenu={showTabsMenu}
          />
        );
      }
    }
  };

  return (
    <>
      {showTabsMenu && (
        <Tabs
          aria-label="simple tabs example"
          style={{
            minHeight: 0,
            padding: '1.2rem',
          }}
          value={currentTab}
          onChange={handleChange}
        >
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={<TokensIcon style={{ marginBottom: 0, marginRight: 5 }} />}
            label="My Badges"
          />
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={<SpnIcon style={{ marginBottom: 0, marginRight: 5 }} />}
            label="SPN"
          />
          <Tab
            classes={{
              root: classes.root,
              wrapper: classes.wrapper,
            }}
            icon={
              <StoreIcon
                style={{ fill: primary[700], marginBottom: 0, marginRight: 5 }}
              />
            }
            label="Store"
          />
        </Tabs>
      )}
      {renderCurrentTab()}
    </>
  );
};

export default WalletTabs;
