import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import { Box, List, ListItem, makeStyles, Typography } from '@material-ui/core';

// styles
import { black, primary } from 'styles/colors';

interface Props {
  squares: Array<any>; // TODO
}

const useStyles = makeStyles(() => ({
  listItemSelected: {
    backgroundColor: `${primary[800]} !important`,
    '& .MuiTypography-root, & .MuiSvgIcon-root': {
      color: `#fff !important`,
    },
  },
}));

const Squares = ({ squares }: Props) => {
  const { asPath, query } = useRouter();
  const { id, squareID } = query;
  const classes = useStyles();

  return (
    <List aria-label="Squares list" role="list">
      {squares.map((square) => (
        <ListItem
          key={square.id}
          button
          disableGutters
          disableRipple
          classes={{
            selected: classes.listItemSelected,
          }}
          component="li"
          role="listitem"
          selected={asPath === `/client/${squareID}/square/${square.id}`}
          style={{
            borderRadius: 10,
            margin: '0.5rem 0',
            padding: '0',
          }}
        >
          <Link href={`/client/${squareID}/square/${square.id}`}>
            <a style={{ width: '100%', padding: '1rem 1.5rem' }}>
              <Box
                aria-label={square.name}
                display="flex"
                justifyContent="space-between"
                role="button"
              >
                <Typography
                  component="span"
                  style={{
                    color: id === square.id ? '#fff' : black,
                  }}
                  variant="h6"
                >
                  #{square.name}
                </Typography>
              </Box>
            </a>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Squares;
