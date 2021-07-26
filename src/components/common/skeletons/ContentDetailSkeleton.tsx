// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

// components
import PostComposerSkeleton from './PostComposerSkeleton';

const ContentDetailSkeleton = () => (
  <Box className="card--rounded-white" display="grid" style={{ gap: 30 }}>
    <Box alignItems="center" display="flex" style={{ gap: 10 }}>
      <Skeleton animation="wave" height={32} variant="circle" width={32} />
      <Skeleton animation="wave" height={20} variant="rect" width="100%" />
    </Box>
    <Skeleton animation="wave" height={166} variant="rect" />
    <Skeleton animation="wave" height={40} variant="rect" width="100%" />
    <Box borderColor="grey.100" borderTop={1} marginX={-3} />
    <PostComposerSkeleton />
  </Box>
);

export default ContentDetailSkeleton;
