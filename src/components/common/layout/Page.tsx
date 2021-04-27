// mui
import { Box, Typography } from '@material-ui/core';

interface Props {
  children: React.ReactElement;
  filters?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
}
const Page = ({ children, filters = null, header, title }: Props) => {
  return (
    <Box display="grid" gap={3}>
      {title && <Typography variant="h1">{title}</Typography>}
      {header && <Box>{header}</Box>}
      {filters && <Box>{filters}</Box>}
      <Box>{children}</Box>
    </Box>
  );
};

export default Page;
