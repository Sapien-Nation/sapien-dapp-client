import { useState } from 'react';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// hooks
import { getTribes } from 'hooks/tribeBar';

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
  Add,
  ArrowDropUp,
  ArrowDropDown,
  Group,
  ShoppingCart,
} from '@material-ui/icons';

// styles
import { darkGrey, gray2, purple, white } from 'styles/colors';

const useStyles = makeStyles(() => ({
  drawerPaper: {
    backgroundColor: 'white',
    borderRight: 'none',
    left: 72,
    width: 228,
  },
  listItemSelected: {
    backgroundColor: `${purple} !important`,
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: `${white} !important`,
    },
  },
}));

const TribeNavigation = () => {
  const tribes = getTribes();
  const classes = useStyles();
  const { asPath, query } = useRouter();
  const [showSquares, setShowSquares] = useState(true);

  const selectedTribe = tribes.find(({ id }) => id === query.tribeid);
  if (!selectedTribe) return null;

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
        <ListItem
          classes={{
            selected: classes.listItemSelected,
          }}
          selected={asPath === `/client/${query.tribeid}`}
          style={{
            borderRadius: 10,
            margin: '1rem .5rem',
            padding: '1rem 1.5rem',
            width: 'auto',
          }}
        >
          <Link href={`/client/${query.tribeid}`}>
            <a style={{ alignItems: 'center', display: 'flex' }}>
              <Group fontSize="small" style={{ color: darkGrey }} />
              <Typography
                style={{
                  marginLeft: 15,
                }}
                variant="captionItem"
              >
                {selectedTribe.name}
              </Typography>
            </a>
          </Link>
        </ListItem>
        <ListItem
          classes={{
            selected: classes.listItemSelected,
          }}
          selected={asPath === `/client/${query.tribeid}/store`}
          style={{
            borderRadius: 10,
            margin: '1rem .5rem',
            padding: '1rem 1.5rem',
            width: 'auto',
          }}
        >
          <Link href={`/client/${query.tribeid}/store`}>
            <a style={{ alignItems: 'center', display: 'flex' }}>
              <ShoppingCart fontSize="small" style={{ color: darkGrey }} />
              <Typography style={{ marginLeft: 15 }} variant="captionItem">
                Badge Store
              </Typography>
            </a>
          </Link>
        </ListItem>
      </List>
      <Box alignItems="center" display="flex" paddingX={2}>
        <Typography variant="captionItem">Squares</Typography>
        <IconButton
          style={{
            backgroundColor: gray2,
            marginLeft: 10,
            padding: 2,
          }}
        >
          <Add fontSize="small" />
        </IconButton>
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => setShowSquares(!showSquares)}
        >
          {showSquares ? <ArrowDropUp /> : <ArrowDropDown />}
        </IconButton>
      </Box>
      <Collapse unmountOnExit in={showSquares} timeout="auto">
        <List aria-label="Squares">
          {selectedTribe.squares.map(({ id, name }) => (
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
              <Link href={`/client/${query.tribeid}/square/${id}`}>
                <a>
                  <Typography variant="body4">#{name}</Typography>
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
