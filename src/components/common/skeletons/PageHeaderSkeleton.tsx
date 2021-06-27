// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const PageHeaderSkeleton = () => (
  <Box minHeight={398}>
    <Skeleton animation="wave" height={200} variant="rect" />
    <Box marginLeft={4}>
      <Skeleton
        animation="wave"
        height={110}
        style={{ top: '-2.5rem' }}
        variant="circle"
        width={110}
      />
      <Box marginLeft={3} marginTop={2.8} width="100%">
        <Skeleton animation="pulse" variant="text" />
        <Skeleton animation="pulse" variant="text" />
        <Skeleton animation="pulse" variant="text" />
      </Box>
    </Box>
  </Box>
);

export default PageHeaderSkeleton;
