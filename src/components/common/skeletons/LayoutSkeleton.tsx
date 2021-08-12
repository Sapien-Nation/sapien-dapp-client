// components
import {
  FeedSkeleton,
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
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Groups } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

// styles
import { neutral } from 'styles/colors';

const useStyles = makeStyles(() => ({
  avatar: {
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: '2px',
    width: '4.8rem',
    height: '4.8rem',
    '& > img': {
      borderRadius: 10,
    },
  },
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
            <span style={{ alignItems: 'center', display: 'flex' }}>
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
            </span>
          </List>
          <Section showAction={false} title="Squares" onClick={() => {}}>
            <List aria-label="Squares list" role="list">
              <ListItem
                button
                disableGutters
                disableRipple
                component="li"
                role="listitem"
                style={{
                  borderRadius: 10,
                  margin: '0.5rem 0',
                  padding: '0',
                }}
              >
                <Box margin="0 auto" width="85%">
                  <Skeleton />
                </Box>
              </ListItem>
              <ListItem
                button
                disableGutters
                disableRipple
                component="li"
                role="listitem"
                style={{
                  borderRadius: 10,
                  margin: '0.5rem 0',
                  padding: '0',
                }}
              >
                <Box margin="0 auto" width="85%">
                  <Skeleton />
                </Box>
              </ListItem>
              <ListItem
                button
                disableGutters
                disableRipple
                component="li"
                role="listitem"
                style={{
                  borderRadius: 10,
                  margin: '0.5rem 0',
                  padding: '0',
                }}
              >
                <Box margin="0 auto" width="85%">
                  <Skeleton />
                </Box>
              </ListItem>
            </List>
          </Section>
          <Section showAction={false} title="Channels" onClick={() => {}}>
            <List aria-label="Channels list" role="list" style={{ padding: 0 }}>
              <ListItem
                disableGutters
                alignItems="flex-start"
                style={{
                  borderRadius: 10,
                  margin: '0.5rem 0',
                  padding: '0',
                }}
              >
                <a
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Skeleton>
                    <Avatar
                      className={classes.avatar}
                      style={{
                        border: '2px solid white',
                      }}
                      variant="square"
                    />
                  </Skeleton>
                  <Box
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    paddingLeft={1.5}
                  >
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography variant="button">
                          <Skeleton />
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            color="textSecondary"
                            display="block"
                            variant="overline"
                          >
                            <Skeleton />
                          </Typography>
                        </>
                      }
                    />
                    <Typography
                      color="textSecondary"
                      display="block"
                      style={{ marginTop: '1rem' }}
                      variant="overline"
                    >
                      <Skeleton />
                    </Typography>
                  </Box>
                </a>
              </ListItem>
              <ListItem
                disableGutters
                alignItems="flex-start"
                style={{
                  borderRadius: 10,
                  margin: '0.5rem 0',
                  padding: '0',
                }}
              >
                <p
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    alignItems: 'center',
                  }}
                >
                  <Skeleton>
                    <Avatar
                      className={classes.avatar}
                      style={{
                        border: '2px solid white',
                      }}
                      variant="square"
                    />
                  </Skeleton>
                  <Box
                    display="flex"
                    flex={1}
                    justifyContent="space-between"
                    paddingLeft={1.5}
                  >
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography variant="button">
                          <Skeleton />
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            color="textSecondary"
                            display="block"
                            variant="overline"
                          >
                            <Skeleton />
                          </Typography>
                        </>
                      }
                    />
                    <Typography
                      color="textSecondary"
                      display="block"
                      style={{ marginTop: '1rem' }}
                      variant="overline"
                    >
                      <Skeleton />
                    </Typography>
                  </Box>
                </p>
              </ListItem>
            </List>
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
