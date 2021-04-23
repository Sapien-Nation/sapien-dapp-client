import { isValidElement } from 'react';

// mui
import { useTheme } from '@material-ui/core';

// styles
import { background } from 'styles/colors';

interface Props {
  children: React.ReactNode;
  filters?: React.ReactNode;
  header?: React.ReactNode;
}

const Container = ({ children, filters, header }: Props) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'grid',
        gap: theme.spacing(3),
        borderRadius: '24px',
        backgroundColor: background,
        padding: theme.spacing(2.8),
      }}
    >
      {isValidElement(header) && header}
      {isValidElement(filters) && filters}
      {isValidElement(children) && <main>{children}</main>}
    </div>
  );
};

export default Container;
