// mui
import { Typography } from '@material-ui/core';

interface Props {
  currentCount: number;
  maxCount: number;
}

const ChartCount = ({ currentCount = 0, maxCount }: Props) => {
  return (
    <Typography
      color={currentCount > maxCount ? 'secondary' : 'inherit'}
      data-testid="chart-count"
      variant="caption"
    >
      {currentCount} / {maxCount}
    </Typography>
  );
};

export default ChartCount;
