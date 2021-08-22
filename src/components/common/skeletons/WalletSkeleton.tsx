// mui
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const WalletSkeleton = () => (
  <Box
    className="card--rounded-white"
    display="grid"
    paddingBottom={2.4}
    paddingX={2.4}
    style={{ gap: 8 }}
  >
    <Skeleton
      animation="wave"
      height={40}
      style={{
        borderRadius: 90,
      }}
      variant="rect"
    />
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />{' '}
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />
    <Skeleton
      animation="wave"
      height={76}
      style={{
        borderRadius: 10,
      }}
      variant="rect"
    />
  </Box>
);

export default WalletSkeleton;
