// mui
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactElement | Array<React.ReactElement>;
  header?: React.ReactElement;
  subHeader?: React.ReactElement;
}

const Page = ({ children, header = null, subHeader = null }: Props) => {
  return (
    <div className="card--rounded-gray">
      <Box
        display="grid"
        maxWidth="79rem"
        paddingX={3.8}
        paddingY={3}
        style={{ gap: '30px', margin: '0 auto' }}
      >
        {header}
        {subHeader}
        {children}
      </Box>
    </div>
  );
};

export default Page;
