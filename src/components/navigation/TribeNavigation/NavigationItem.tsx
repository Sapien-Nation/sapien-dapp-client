// mui
import { ListItem } from '@material-ui/core';

// styles
import { purple, white } from 'styles/colors';

interface Props {
  children: React.ReactElement;
  isSelected: boolean;
  onClick: () => void;
}

const NavigationItem = ({ children, isSelected, onClick }: Props) => (
  <ListItem
    button
    disableGutters
    disableRipple
    style={{
      margin: '.65rem',
      display: 'flex',
      padding: '1.5rem',
      backgroundColor: isSelected ? purple : white,
      borderRadius: '1rem',
    }}
    onClick={onClick}
  >
    {children}
  </ListItem>
);

export default NavigationItem;
