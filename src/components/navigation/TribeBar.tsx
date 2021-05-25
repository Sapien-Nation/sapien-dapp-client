// next
import Link from 'next/link';

// styles
import { dark, darkPurple } from 'styles/colors';

// mui
import { Avatar, Drawer, makeStyles } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 72,
    backgroundColor: dark,
  },
  avatarImage: {
    borderRadius: '10px',
  },
}));

const TribeBar = () => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{ width: 72 }}
      variant="permanent"
    >
      <nav
        aria-label="Tribe Bar"
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        <Link href="login">
          <Avatar
            alt="Remy Sharp"
            classes={{
              img: classes.avatarImage,
            }}
            src="/fixtures/256x256/bob.png"
            style={{
              color: 'white',
              backgroundColor: 'inherit',
              borderRadius: 15,
              border: '2px solid',
              boxSizing: 'content-box',
              padding: '3px',
              cursor: 'pointer',
            }}
            variant="rounded"
          />
        </Link>
        <Avatar
          style={{
            backgroundColor: 'inherit',
            borderRadius: 15,
            border: `2px ${darkPurple} solid`,
            boxSizing: 'content-box',
            padding: '3px',
          }}
          variant="square"
        >
          <AddIcon aria-label="Create Tribe" style={{ padding: 0.3 }} />
        </Avatar>
      </nav>
    </Drawer>
  );
};

export default TribeBar;
