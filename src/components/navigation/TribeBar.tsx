import { useState } from 'react';

// hooks
import { getTribes } from 'hooks';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// styles
import { dark, darkPurple } from 'styles/colors';

// mui
import { Avatar, Drawer, IconButton, makeStyles } from '@material-ui/core';
import { AddRounded as AddIcon } from '@material-ui/icons';

// components
import CreateTribeModal from './CreateTribeModal';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 72,
    backgroundColor: dark,
  },
  avatarImage: {
    borderRadius: '10px',
  },
}));

const colors = [
  '#6b5b95',
  '#d64161',
  '#ff7b25',
  '#6b5b95',
  '#878f99',
  '#3e4444',
  '#f7786b',
  '#c94c4c',
  '#50394c',
  '#f18973',
  '#618685',
  '#36486b',
  '#4040a1',
];

const TribeBar = () => {
  const [showModal, setShowModal] = useState(false);
  const tribes = getTribes();
  const { asPath } = useRouter();
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
        {tribes.map((tribe, index) => (
          <Link key={tribe.id} href={`/client/${tribe.mainSquareId}`}>
            <a>
              <Avatar
                alt={tribe.name}
                classes={{
                  img: classes.avatarImage,
                }}
                src={tribe.avatar}
                style={{
                  color: 'white',
                  backgroundColor: tribe.avatar === null ? colors[index] : '',
                  borderRadius: 15,
                  border: asPath.includes(`/client/${tribe.mainSquareId}`)
                    ? '2px solid'
                    : `2px solid #322837`,
                  boxSizing: 'content-box',
                  padding: '3px',
                }}
                variant="rounded"
              >
                {tribe.avatar_original ? (
                  <img
                    alt={tribe.name}
                    className="MuiAvatar-img"
                    src={tribe.avatar_original}
                  />
                ) : (
                  tribe.name[0].toUpperCase()
                )}
              </Avatar>
            </a>
          </Link>
        ))}
        <IconButton
          aria-label="Create Tribe"
          onClick={() => setShowModal(true)}
        >
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
            <AddIcon />
          </Avatar>
        </IconButton>
      </nav>

      {showModal && <CreateTribeModal onClose={() => setShowModal(false)} />}
    </Drawer>
  );
};

export default TribeBar;
