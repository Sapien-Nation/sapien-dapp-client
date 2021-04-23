// mui
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactElement;
  filters?: React.ReactNode;
  header: React.ReactNode;
}

const Page = ({ children, filters = null, header }: Props) => {
  return (
    <Box display="grid" gap={3}>
      <Box>{header}</Box>
      {filters && <Box>{filters}</Box>}
      <Box>{children}</Box>
    </Box>
  );
};

export default Page;
