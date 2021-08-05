// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// hooks
// import { getTribes } from 'hooks';

// styles
// import { neutral } from 'styles/colors';

// mui
import { Drawer, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 290,
    borderLeft: 'none',
    overflow: 'auto',
    height: `calc(100% - 97px)`,
    top: 97,
  },
}));

const Wdigets = () => {
  const classes = useStyles();
  //const { asPath } = useRouter();

  return (
    <Drawer
      anchor="right"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{ gridArea: 'widgets' }}
      variant="permanent"
    >
      TODO
    </Drawer>
  );
};

export default Wdigets;
