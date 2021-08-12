// components
import {
  Page,
  PageHeaderSkeleton,
  PostComposerSkeleton,
} from 'components/common';
import Section from 'components/navigation/TribeNavigation/Section';

// mui
import {
  Avatar,
  Box,
  Drawer,
  makeStyles,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Groups } from '@material-ui/icons';

// styles
import { neutral } from 'styles/colors';
import FeedSkeleton from './FeedSkeleton';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: 72,
    backgroundColor: neutral[800],
    borderRight: 'none',
  },
  drawerPaperSecondary: {
    backgroundColor: 'white',
    borderRight: 'none',
    left: 72,
    width: 228,
    padding: '2.5rem 0.5rem',
  },
  avatarImage: {
    borderRadius: '1rem',
  },
}));

const LayoutSkeleton = () => {
  const classes = useStyles();

  return (
    <Box>
      <nav aria-label="Main navigation" style={{ gridArea: 'sidebar' }}>
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
            {[1, 2, 3, 4].map((tribe) => (
              <Avatar
                key={tribe}
                classes={{
                  img: classes.avatarImage,
                }}
                src={null}
                style={{
                  color: 'white',
                  borderRadius: 15,
                  border: '2px solid',
                  boxSizing: 'border-box',
                  padding: '2px',
                  width: '4.8rem',
                  height: '4.8rem',
                }}
                variant="rounded"
              >
                T
              </Avatar>
            ))}
          </nav>
        </Drawer>
        <Drawer
          anchor="left"
          classes={{
            paper: classes.drawerPaperSecondary,
          }}
          style={{
            width: 228,
          }}
          variant="permanent"
        >
          <List aria-label="Tribe Navigation">
            <p style={{ alignItems: 'center', display: 'flex' }}>
              <ListItem
                selected
                style={{
                  borderRadius: 10,
                  padding: '1rem 1.5rem',
                }}
              >
                <Groups fontSize="small" style={{ color: neutral[500] }} />
                <Typography
                  style={{
                    marginLeft: 15,
                  }}
                  variant="caption"
                >
                  Sapien
                </Typography>
              </ListItem>
            </p>
          </List>
          <Section showAction={false} title="Squares" onClick={() => {}}>
            <></>
          </Section>
          <Section showAction={false} title="Channels" onClick={() => {}}>
            <></>
          </Section>
          <Section showAction={false} title="My Messages" onClick={() => {}}>
            <></>
          </Section>
        </Drawer>
      </nav>
      <div style={{ gridArea: 'main' }}>
        <Page
          header={<PageHeaderSkeleton />}
          subHeader={<PostComposerSkeleton />}
        >
          <FeedSkeleton />
        </Page>
      </div>
    </Box>
  );
};

export default LayoutSkeleton;
