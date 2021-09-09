// components
import ContentFeedSkeleton from './ContentFeedSkeleton';

// mui
import { Box } from '@material-ui/core';

const DiscoverySkeleton = () => {
  return (
    <Box display="contents" gridGap={30}>
      {[...Array(15)].map((e, index) => (
        <ContentFeedSkeleton key={index} />
      ))}
    </Box>
  );
};

export default DiscoverySkeleton;
