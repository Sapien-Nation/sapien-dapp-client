import { useFormContext } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  name: string;
  maxCount: string;
}

const ChartCount = ({ name, maxCount }: Props) => {
  const { watch } = useFormContext();
  const val = watch(name) as string;
  return (
    <Typography data-testid="chart-count" variant="caption">
      {val?.length || 0} / {maxCount}
    </Typography>
  );
};

export default ChartCount;
