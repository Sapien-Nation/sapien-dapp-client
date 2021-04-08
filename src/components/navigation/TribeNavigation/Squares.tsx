// types
import type { Square } from 'tools/types/square';

// mui
import { Box, List, ListItem, Typography } from '@material-ui/core';

// context
import { useNavigation, NavigationTypes } from 'context/tribes';

// styles
import { black, darkGrey, purple, white } from 'styles/colors';

interface Props {
  squares: Array<Square>;
}

const Squares = ({ squares }: Props) => {
  const [navigation, setNavigation] = useNavigation();

  return (
    <List aria-label="Squares list" role="list">
      {squares.map((square) => (
        <ListItem
          key={square.id}
          button
          disableGutters
          disableRipple
          component="li"
          onClick={() =>
            setNavigation({
              secondary: square.id,
              type: NavigationTypes.Channel,
            })
          }
        >
          <Box
            aria-label={square.name}
            display="flex"
            justifyContent="space-between"
            role="listitem"
            style={{
              margin: '0 .65rem',
              padding: '1rem',
              width: '100%',
              color: navigation?.secondary === square.id ? white : darkGrey,
              backgroundColor:
                navigation?.secondary === square.id ? purple : white,
              borderRadius: '1rem',
            }}
          >
            <Typography
              style={{
                color: navigation?.secondary === square.id ? white : black,
              }}
              variant="body1"
            >
              #{square.name}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default Squares;
