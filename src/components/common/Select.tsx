import { useState } from 'react';

// types
import type { InputProps } from '@material-ui/core';

// mui
import { Box, Select, MenuItem, InputLabel, useTheme } from '@material-ui/core';

interface Props extends InputProps {
  defaultValue: any;
  name: string;
  options: Array<{
    name: string;
    value: string;
  }>;
  label: string;
}

const SelectInput = ({
  defaultValue,
  name,
  onChange,
  options,
  label,
  ...rest
}: Props) => {
  const theme = useTheme();
  const [selected, setSelect] = useState(defaultValue);

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
      style={{
        background: (theme as any).palette.input.main,
        borderRadius: '0.6rem',
        padding: `0 ${theme.spacing(1)}`,
      }}
    >
      <InputLabel
        color="secondary"
        htmlFor={name}
        style={{
          color: (theme as any).palette.caption.main,
        }}
      >
        {label}
      </InputLabel>
      <Select
        displayEmpty={true}
        id={name}
        inputProps={{ 'aria-label': `${name} label` }}
        name={name}
        sx={{
          background: 'transparent',
          flex: 1,
          minHeight: '4rem',
          fontWeight: 600,
        }}
        value={selected}
        variant="standard"
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setSelect(event.target.value as string);
          onChange(event.target.value as any);
        }}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
