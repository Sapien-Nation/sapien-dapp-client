import { useState } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// hooks
import { getTribes } from 'hooks';

// mui
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ArrowDropUp,
  ArrowDropDown,
  Group,
  ShoppingCart,
} from '@material-ui/icons';

// styles
import { darkGrey, primary } from 'styles/colors';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    backgroundColor: 'white',
    borderRight: 'none',
    left: 72,
    width: 228,
  },
  listItemSelected: {
    backgroundColor: `${primary} !important`,
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: `#fff !important`,
    },
  },
}));

const TribeNavigation = () => {
  const tribes = getTribes();
  const classes = useStyles();
  const { asPath, query } = useRouter();
  const [showSquares, setShowSquares] = useState(true);

  const selectedTribe = tribes.find(
    ({ mainSquareId }) => mainSquareId === query.squareID
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
              selected={asPath === `/client/${query.squareID}`}
              style={{
                borderRadius: 10,
                margin: '1rem .5rem',
                padding: '1rem 1.5rem',
              }}
            >
              <Group fontSize="small" style={{ color: darkGrey }} />
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
        <Link href={`/client/${query.squareID}/store`}>
          <a style={{ alignItems: 'center', display: 'flex' }}>
            <ListItem
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={asPath === `/client/${query.squareID}/store`}
              style={{
                borderRadius: 10,
                margin: '1rem .5rem',
                padding: '1rem 1.5rem',
              }}
            >
              <ShoppingCart fontSize="small" style={{ color: darkGrey }} />
              <Typography style={{ marginLeft: 15 }} variant="caption">
                Badge Store
              </Typography>
            </ListItem>
          </a>
        </Link>
      </List>
      <Box alignItems="center" display="flex" paddingX={2}>
        <Typography variant="caption">Squares</Typography>
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => setShowSquares(!showSquares)}
        >
          {showSquares ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
      </Box>
      <Collapse unmountOnExit in={showSquares} timeout="auto">
        <List aria-label="Squares">
          {selectedTribe?.squares.map(({ id, name }) => (
            <ListItem
              key={id}
              classes={{
                selected: classes.listItemSelected,
              }}
              selected={id === query.id}
              style={{
                borderRadius: 10,
                margin: '0 .5rem',
                padding: '0 1.5rem',
                width: 'auto',
                minHeight: '4rem',
              }}
            >
              <Link href={`/client/${query.squareID}/square/${id}`}>
                <a>
                  <Typography variant="caption">#{name}</Typography>
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Drawer>
  );
};

export default TribeNavigation;
