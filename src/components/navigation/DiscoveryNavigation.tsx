import Link from 'next/link';
import { useRouter } from 'next/router';

// types
import type { Theme } from '@material-ui/core/styles';
import type { Topic } from 'tools/types/topic';

// mui
import {
  Box,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';

// components
import { Query } from 'components/common';

const drawerWidth = 228;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    left: '72px',
    width: drawerWidth,
    backgroundColor: 'white',
    borderRight: 'none',
    paddingLeft: theme.spacing(2.2),
    marginTop: theme.spacing(3.7),
  },
  nav: {
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
  },
  listItem: {
    padding: 0,
    fontSize: '1.4rem',
    '&.Mui-selected': {
      background: 'transparent',
      fontWeight: 600,
    },
  },
  link: {
    color: 'inherit',
  },
}));

const DiscoverNavigation = () => {
  const { pathname, query } = useRouter();
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
      <Typography component="h2">Topics</Typography>
      <Typography>All Topics</Typography>
      <List aria-label="Discover Navigation" className={classes.nav}>
        <Query
          api="/api/topics/all"
          loader={null}
          options={{ fetcher: () => [] }}
        >
          {(topics: Array<Topic>) => (
            <>
              {topics.map(({ id, name }) => (
                <ListItem
                  key={id}
                  aria-label={`topic: ${name}`}
                  className={classes.listItem}
                  selected={query.topic === name}
                >
                  <Box paddingY={0.8}>
                    <Link href={`${pathname}?topic=${name}`}>
                      <a className={classes.link}>#{name}</a>
                    </Link>
                  </Box>
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
