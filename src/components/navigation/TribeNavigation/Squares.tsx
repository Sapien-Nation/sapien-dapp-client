// types
import type { Square } from 'tools/types/square';

// next
import Link from 'next/link';
import { useRouter } from 'next/router';

// mui
import { Box, List, ListItem, Typography } from '@material-ui/core';

// styles
import { black, darkGrey, purple, white } from 'styles/colors';

interface Props {
  squares: Array<Square>;
}

const Squares = ({ squares }: Props) => {
  const router = useRouter();
  const { id, tribeid } = router.query;

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
          <Link href={`/client/${tribeid}/square/${square.id}`}>
            <Box
              aria-label={square.name}
              display="flex"
              justifyContent="space-between"
              role="button"
              style={{
                margin: '0 .65rem',
                padding: '1rem',
                width: '100%',
                color: id === square.id ? white : darkGrey,
                backgroundColor: id === square.id ? purple : white,
                borderRadius: '1rem',
              }}
            >
              <Typography
                style={{
                  color: id === square.id ? white : black,
                }}
                variant="body4"
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
