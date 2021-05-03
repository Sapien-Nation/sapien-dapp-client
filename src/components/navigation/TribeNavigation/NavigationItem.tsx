// mui
import { ListItem } from '@material-ui/core';

// next
import Link from 'next/link';

// styles
import { purple, white } from 'styles/colors';

interface Props {
  children: React.ReactElement;
  isSelected: boolean;
  to: string;
}

const NavigationItem = ({ children, isSelected, to }: Props) => (
  <Link href={to}>
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
    >
      {children}
    </ListItem>
  </Link>
);

export default NavigationItem;
