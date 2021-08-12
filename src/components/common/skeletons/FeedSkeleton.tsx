// mui
import { Box } from '@material-ui/core';

// components
import ContentFeedSkeleton from './ContentFeedSkeleton';

const FeedSkeleton = () => (
  <Box display="grid" gridGap={30}>
    <ContentFeedSkeleton />
    <ContentFeedSkeleton />
    <ContentFeedSkeleton />
  </Box>
);

export default FeedSkeleton;
