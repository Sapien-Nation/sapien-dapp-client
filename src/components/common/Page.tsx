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
      <Box display="grid" paddingX={3.8} paddingY={3} style={{ gap: '30px' }}>
        {header}
        {subHeader}
        {children}
      </Box>
    </div>
  );
};

export default Page;
