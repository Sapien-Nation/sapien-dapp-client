// types
import type { ChipProps } from '@material-ui/core/Chip';

// assets
import { Spn as SpnIcon } from 'assets';

// mui
import { Chip as MuiChip } from '@material-ui/core';

const Chip = ({ ...props }: ChipProps) => {
  return (
    <MuiChip
      icon={<SpnIcon />}
      style={{
        backgroundColor: 'rgba(98, 0, 234, 0.05)',
        borderRadius: 90,
        color: '#6200EA',
        fontSize: 16,
        fontWeight: 'bold',
        height: 40,
        padding: 10,
      }}
      {...props}
    />
  );
};

export default Chip;
