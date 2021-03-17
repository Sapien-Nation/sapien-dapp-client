// types
import type { SelectProps } from '@material-ui/core';

// mui
import {
  Box,
  createStyles,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';

interface Props extends SelectProps {
  id: string;
  options: Array<{
    name: string;
    value: string;
  }>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      background: 'none',
      border: 'none !important',
      padding: theme.spacing(0),
      '&:focus': {
        backgroundColor: 'none',
      },
    },
    label: {
      marginRight: theme.spacing(0.8),
      color: (theme as any).palette.caption.main,
      fontWeight: 'normal',
    },
  })
);

const SelectInput = ({ id, options, label, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <Box alignItems="center" display="flex" justifyContent="flex-start">
      <InputLabel className={classes.label} id={`${id}-label`}>
        {label}:
      </InputLabel>

      <Select
        displayEmpty
        className={classes.select}
        id={id}
        labelId={`${id}-label`}
        {...rest}
      >
        {options.map((data) => (
          <MenuItem key={data.name} value={data.value}>
            {data.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
