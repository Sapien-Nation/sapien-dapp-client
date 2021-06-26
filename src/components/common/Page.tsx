// mui
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactElement;
  header: React.ReactElement;
  subHeader: React.ReactElement;
}

const Page = ({ children, header, subHeader }: Props) => {
  return (
    <div className="card--rounded-gray">
      <Box display="grid" gap={3} paddingX={3.8} paddingY={3}>
        {header}
        {subHeader}
        {children}
      </Box>
    </div>
  );
};

export default Page;
