import { useState } from 'react';

// mui
import { Tabs, Tab, makeStyles } from '@material-ui/core';

// assets
import {
  Spn as SpnIcon,
  Tokens as TokensIcon,
  Store as StoreIcon,
} from 'assets';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
    minHeight: 0,
  },
  wrapper: {
    flexDirection: 'row',
  },
}));

const Tokens = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      aria-label="simple tabs example"
      style={{
        minHeight: 0,
        padding: '1.2rem',
      }}
      value={value}
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
  );
};

export default Tokens;
