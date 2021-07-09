// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const ContentFeedSkeleton = () => (
  <Box
    className="card--rounded-white"
    display="grid"
    paddingX={3}
    paddingY={3.6}
    style={{ gap: 22 }}
  >
    <Skeleton animation="wave" height={40} variant="rect" />
    <Skeleton animation="wave" height={166} variant="rect" />
  </Box>
);

export default ContentFeedSkeleton;
