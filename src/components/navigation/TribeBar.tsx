import { useState } from 'react';

// types
import type { Tribe } from 'tools/types/tribeBar';

// next
import Link from 'next/link';

// styles
import { dark, darkPurple } from 'styles/colors';

// mui
import { Avatar, Drawer, IconButton, makeStyles } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';

// components
import CreateTribeModal from './CreateTribeModal';
import { Query } from 'components/common';

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
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
    >
      <nav
        aria-label="Tribe Bar"
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginTop: '2rem',
        }}
      >
        <Query apiUrl="/api/profile/c21e8bb0-ae58-4a3d-b02c-8e1a5ed2de6a/tribes?append_to_response=squares,channels">
          {(tribes: Array<Tribe>) => (
            <>
              {tribes.map((tribe) => (
                <Link key={tribe.id} href={`/client/${tribe.id}`}>
                  <a>
                    <Avatar
                      alt={tribe.name}
                      classes={{
                        img: classes.avatarImage,
                      }}
                      src={tribe.avatar}
                      style={{
                        color: 'white',
                        borderRadius: 15,
                        border: '2px solid',
                        boxSizing: 'content-box',
                        padding: '3px',
                      }}
                      variant="rounded"
                    />
                  </a>
                </Link>
              ))}
            </>
          )}
        </Query>
        <IconButton onClick={() => setShowModal(true)}>
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
        </IconButton>
      </nav>

      {showModal && <CreateTribeModal onClose={() => setShowModal(false)} />}
    </Drawer>
  );
};

export default TribeBar;
