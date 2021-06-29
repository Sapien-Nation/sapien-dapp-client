import { useWatch } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  control: any;
  name: string;
  maxCount: number;
}

const ChartCount = ({ control, maxCount, name }: Props) => {
  const currentValue = useWatch({
    control,
    name,
  });

  const currentCount = currentValue?.length || 0;
  return (
    <Typography
      color={currentCount > maxCount ? 'error' : 'inherit'}
      data-testid="chart-count"
      variant="caption"
    >
      {currentCount} / {maxCount}
    </Typography>
  );
};

export default ChartCount;
