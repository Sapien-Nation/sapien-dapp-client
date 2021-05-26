import { useWatch } from 'react-hook-form';

// types
import type { Control } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  control: Control;
  name: string;
  maxCount: number;
}

const ChartCount = ({ control, maxCount, name }: Props) => {
  const currentValue = useWatch({
    control,
    name,
  });

  const currentCount = currentValue.length;
  return (
    <Typography
      color={currentCount > maxCount ? 'primary' : 'inherit'}
      data-testid="chart-count"
      variant="caption"
    >
      {currentCount} / {maxCount}
    </Typography>
  );
};

export default ChartCount;
