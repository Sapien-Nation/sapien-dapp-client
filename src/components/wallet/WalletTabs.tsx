import { useState } from 'react';

// mui
import { Box, Tabs, Tab, makeStyles } from '@material-ui/core';

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
  const classes = useStyles();
  const handleChange = (_, newValue) => {
    setCurrentTab(newValue);
  };

  const renderCurrentTab = () => {
    switch (currentTab) {
      case WalletTab.MyBadges: {
        return <div>My Badges</div>;
      }
      case WalletTab.Spn: {
        return <div>SPN</div>;
      }
      case WalletTab.Store: {
        return <Store />;
      }
    }
  };

  return (
    <>
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
          icon={<StoreIcon style={{ marginBottom: 0, marginRight: 5 }} />}
          label="Store"
        />
      </Tabs>
      <Box paddingX={2.4}>{renderCurrentTab()}</Box>
    </>
  );
};

export default WalletTabs;
