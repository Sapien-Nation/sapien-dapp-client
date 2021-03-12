// types
import type { Theme } from '@material-ui/core/styles';
import type { Topic } from 'tools/types/topic';

// mui
import {
  Box,
  createStyles,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

// components
import Query from 'components/query';

const drawerWidth = 228;

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      left: '72px',
      width: drawerWidth,
      backgroundColor: 'white',
      borderRight: 'none',
    },
    nav: {
      cursor: 'pointer',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(3.7),
      marginLeft: theme.spacing(2.2),
    },
  });
});

const DiscoverNavigation = () => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
    >
      <List aria-label="Discover Navigation" className={classes.nav}>
        <ListItem aria-label="topics title" style={{ marginBottom: 16 }}>
          <Typography variant="body2">TOPICS</Typography>
        </ListItem>
        <ListItem>
          <Box marginBottom={0.9} marginTop={2.5}>
            <Typography aria-label="all topics" variant="body1">
              All Topics
            </Typography>
          </Box>
        </ListItem>

        <Query apiUrl="/api/topics/all" loader={null}>
          {({ topics }: { topics: Array<Topic> }) => (
            <>
              {topics.map(({ id, name }) => (
                <ListItem
                  key={id}
                  aria-label={`topic: ${name}`}
                  style={{ marginBottom: 0.9 }}
                >
                  <Typography variant="caption">#{name}</Typography>
                </ListItem>
              ))}
            </>
          )}
        </Query>
      </List>
    </Drawer>
  );
};

export default DiscoverNavigation;
