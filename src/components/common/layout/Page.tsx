// mui
import { Box, Typography } from '@material-ui/core';

// styles
import { background } from 'styles/colors';

interface Props {
  actions?: React.ReactNode;
  children: React.ReactElement;
  filters?: React.ReactNode;
  header?: React.ReactNode;
  title?: string;
  userWrapper?: boolean;
}
const Page = ({
  actions,
  children,
  filters = null,
  header,
  title,
  userWrapper = false,
}: Props) => {
  return (
    <Box
      bgcolor={userWrapper && background}
      borderRadius={userWrapper && '2.6rem 2.6rem 0 0'}
      display="grid"
      gap={3}
      marginRight={userWrapper && 3}
      padding={userWrapper && 2.8}
    >
      {title && (
        <Typography marginLeft={userWrapper && 3.2} variant="h2">
          {title}
        </Typography>
      )}
      {header && <Box>{header}</Box>}
      {actions && <Box>{actions}</Box>}
      {filters && <Box>{filters}</Box>}
      <Box>{children}</Box>
    </Box>
  );
};

export default Page;
