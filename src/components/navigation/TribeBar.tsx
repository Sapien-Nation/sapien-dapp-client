import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// hooks
import { getTribes } from 'hooks';

// styles
import { neutral } from 'styles/colors';

// mui
import { Avatar, Drawer, IconButton, makeStyles } from '@material-ui/core';
import { AddRounded as AddIcon, Explore } from '@material-ui/icons';

// components
import { CreateTribeModal } from 'components/navigation';
import { ComingSoon } from 'components/common';

// types
import type { Tribe } from 'tools/types/tribeBar';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 72,
    backgroundColor: neutral[800],
    borderRight: 'none',
  },
  avatarImage: {
    borderRadius: '1rem',
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
  const [showPreviewTribe, setShowPreviewTribe] = useState(false);

  const tribes = getTribes();
  const classes = useStyles();
  const { asPath } = useRouter();

  const showPreview = false;

  const isTribeSelected = (tribe: Tribe) => {
    if (tribe.isMain) {
      return asPath === '/client/sapien';
    }

    return asPath.includes(`/client/${tribe.mainSquareId}`);
  };

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
          gap: '2.8rem',
          padding: '2.8rem 0',
        }}
      >
        {tribes.map((tribe, index) => {
          const isSapienTribe = tribe.isMain;
          return (
            <Link
              key={tribe.id}
              href={
                isSapienTribe
                  ? '/client/sapien'
                  : `/client/${tribe.mainSquareId}`
              }
            >
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
                    border: isTribeSelected(tribe)
                      ? '2px solid'
                      : `2px solid #322837`,
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '4.8rem',
                    height: '4.8rem',
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
          );
        })}
        <Link href="/discovery">
          <a aria-label="Browse discovery page from here">
            <Avatar
              alt="discovery"
              classes={{
                img: classes.avatarImage,
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 15,
                boxSizing: 'border-box',
                border: `2px solid ${neutral[700]}`,
                padding: '2px',
                width: '4.8rem',
                height: '4.8rem',
              }}
              variant="rounded"
            >
              <Explore htmlColor={neutral[700]} />
            </Avatar>
          </a>
        </Link>
        <IconButton
          aria-label="Create Tribe"
          style={{ padding: 0 }}
          onClick={() =>
            showPreview
              ? setShowPreviewTribe(!showPreviewTribe)
              : setShowModal(true)
          }
        >
          <Avatar
            style={{
              backgroundColor: neutral[700],
              borderRadius: 15,
              boxSizing: 'border-box',
              width: '4rem',
              height: '4rem',
            }}
            variant="square"
          >
            <AddIcon />
          </Avatar>
        </IconButton>
        <ComingSoon open={showPreviewTribe}>
          <div></div>
        </ComingSoon>
      </nav>

      {showModal && <CreateTribeModal onClose={() => setShowModal(false)} />}
    </Drawer>
  );
};

export default TribeBar;
