// mui
import { Box } from '@material-ui/core';

// styles
import { white } from 'styles/colors';

interface Props {
  children: React.ReactElement;
  secondary: React.ReactNode;
}

const Container = ({ children, secondary }: Props) => {
  return (
    <Box
      display="grid"
      gridTemplateAreas="'main secondary'"
      gridTemplateColumns="auto 290px"
      minHeight="100vh"
    >
      <Box className="card--rounded" paddingX={3.6} paddingY={3.8}>
        {children}
      </Box>
      <Box bgcolor={white} paddingX={2.5}>
        {secondary}
      </Box>
    </Box>
  );
};

export default Container;
