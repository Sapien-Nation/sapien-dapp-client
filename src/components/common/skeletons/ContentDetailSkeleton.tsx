// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

// components
import PostComposerSkeleton from './PostComposerSkeleton';

const ContentDetailSkeleton = () => (
  <Box
    className="card--rounded-white"
    display="grid"
    paddingX={3}
    paddingY={3.6}
    style={{ gap: 30 }}
  >
    <Box alignItems="center" display="flex" style={{ gap: 10 }}>
      <Skeleton animation="wave" height={32} variant="circle" width={32} />
      <Skeleton animation="wave" height={20} variant="rect" width="100%" />
    </Box>
    <Skeleton animation="wave" height={166} variant="rect" />
    <Skeleton animation="wave" height={40} variant="rect" width="100%" />
    <Box marginX={-3}>
      <Skeleton animation="wave" height={1} variant="rect" width="100%" />
    </Box>
    <PostComposerSkeleton />
  </Box>
);

export default ContentDetailSkeleton;
