// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const PostComposerSkeleton = () => (
  <Box
    alignItems="center"
    className="card--rounded-white"
    display="grid"
    padding={3}
    style={{ gridTemplateColumns: '32px 1fr', gap: '10px' }}
  >
    <Skeleton animation="wave" height={32} variant="circle" width={32} />
    <Skeleton animation="wave" height={40} variant="rect" />
  </Box>
);

export default PostComposerSkeleton;
