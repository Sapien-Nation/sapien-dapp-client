// mui
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  filter?: React.ReactElement;
  header?: React.ReactElement;
  subHeader?: React.ReactElement;
}

const Page = ({
  children,
  filter = null,
  header = null,
  subHeader = null,
}: Props) => {
  return (
    <Box
      className="card--rounded-gray"
      marginTop={12.7}
      paddingX={3.8}
      paddingY={3}
    >
      <Box
        display="grid"
        maxWidth="79rem"
        style={{ gap: '30px', margin: '0 auto' }}
      >
        {header}
        {filter}
        {subHeader}
        {children}
      </Box>
    </Box>
  );
};

export default Page;
