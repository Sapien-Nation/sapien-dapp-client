// mui
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  header?: React.ReactElement;
  subHeader?: React.ReactElement;
}

const Page = ({ children, header = null, subHeader = null }: Props) => {
  return (
    <Box className="card--rounded-gray" paddingX={3.8} paddingY={3}>
      <Box
        display="grid"
        maxWidth="79rem"
        style={{ gap: '30px', margin: '0 auto' }}
      >
        {header}
        {subHeader}
        {children}
      </Box>
    </Box>
  );
};

export default Page;
