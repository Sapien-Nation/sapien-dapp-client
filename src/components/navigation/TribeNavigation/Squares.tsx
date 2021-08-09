import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import { Box, List, ListItem, Typography } from '@material-ui/core';

// styles
import { black, darkGrey } from 'styles/colors';

interface Props {
  squares: Array<any>; // TODO
}

const Squares = ({ squares }: Props) => {
  const router = useRouter();
  const { id, squareID } = router.query;

  return (
    <List aria-label="Squares list" role="list">
      {squares.map((square) => (
        <ListItem
          key={square.id}
          button
          disableGutters
          disableRipple
          component="li"
          role="listitem"
        >
          <Link href={`/client/${squareID}/square/${square.id}`}>
            <Box
              aria-label={square.name}
              display="flex"
              justifyContent="space-between"
              role="button"
              style={{
                margin: '0 .65rem',
                padding: '1rem',
                width: '100%',
                color: id === square.id ? '#fff' : darkGrey,
                backgroundColor: id === square.id ? '#6200EA' : '#fff',
                borderRadius: '1rem',
              }}
            >
              <Typography
                style={{
                  color: id === square.id ? '#fff' : black,
                }}
              >
                #{square.name}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Squares;
