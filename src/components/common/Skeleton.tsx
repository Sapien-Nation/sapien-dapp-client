// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const SkeletonLoader = () => (
  <Box>
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
  </Box>
);

export default SkeletonLoader;
