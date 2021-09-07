// components
import ContentFeedSkeleton from './ContentFeedSkeleton';

// mui
import { Box } from '@material-ui/core';

const DiscoverySkeleton = () => {
  return (
    <Box display="contents" gridGap={30}>
      <ContentFeedSkeleton />
      <ContentFeedSkeleton />
      <ContentFeedSkeleton />
      <ContentFeedSkeleton />
      <ContentFeedSkeleton />
    </Box>
  );
};

export default DiscoverySkeleton;
