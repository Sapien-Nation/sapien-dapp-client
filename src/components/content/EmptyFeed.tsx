// mui
import { Box, Typography } from '@material-ui/core';

const EmptyFeed = () => (
  <Box className="card--rounded-white" padding={4} textAlign="center">
    <Typography>
      There are no more posts{' '}
      <span aria-label="No more posts" role="img">
        🙈
      </span>
    </Typography>
  </Box>
);

export default EmptyFeed;
