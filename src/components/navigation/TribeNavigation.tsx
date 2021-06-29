import Link from 'next/link';
import { useRouter } from 'next/router';

// hooks
import { getTribes } from 'hooks';

// mui
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Group } from '@material-ui/icons';

// styles
import { neutral, primary } from 'styles/colors';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    backgroundColor: 'white',
    borderRight: 'none',
    left: 72,
    width: 228,
  },
  listItemSelected: {
    backgroundColor: `${primary[800]} !important`,
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: `#fff !important`,
    },
  },
}));

const TribeNavigation = () => {
  const tribes = getTribes();
  const classes = useStyles();
  const { asPath, query } = useRouter();

  const { squareID } = query;
  const selectedTribe = tribes.find(
    ({ mainSquareId }) => mainSquareId === squareID
  );

  return (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
      style={{
        width: 228,
      }}
      variant="permanent"
    >
      <List aria-label="Tribe Navigation">
        <Link href={`/client/${selectedTribe?.mainSquareId}`}>
          <a style={{ alignItems: 'center', display: 'flex' }}>
            <ListItem
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={asPath === `/client/${squareID}`}
              style={{
                borderRadius: 10,
                margin: '1rem .5rem',
                padding: '1rem 1.5rem',
              }}
            >
              <Group fontSize="small" style={{ color: neutral[500] }} />
              <Typography
                style={{
                  marginLeft: 15,
                }}
                variant="caption"
              >
                {selectedTribe?.name.toUpperCase()}
              </Typography>
            </ListItem>
          </a>
        </Link>
      </List>
    </Drawer>
  );
};

export default TribeNavigation;
