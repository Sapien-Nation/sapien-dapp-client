import { useWatch } from 'react-hook-form';

// mui
import { Typography } from '@material-ui/core';

interface Props {
  field: string;
  maxCount: string;
  control: string | any;
}
const ChartCount: React.FC<Props> = ({ control, field, maxCount }) => {
  const val = useWatch({
    control,
    name: field
  }) as string;
  return (
    <Typography data-testid="chart-count" variant="caption">
      {val?.length || 0} / {maxCount}
    </Typography>
  );
};

export default ChartCount;
