// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const PostComposerSkeleton = () => (
  <Box
    className="card--rounded-white"
    display="grid"
    paddingX={1.5}
    paddingY={3.6}
    style={{ gap: 22 }}
  >
    <Skeleton animation="pulse" height={40} variant="rect" />
    <Skeleton animation="pulse" height={166} variant="rect" />
  </Box>
);

export default PostComposerSkeleton;
