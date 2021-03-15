/* istanbul ignore file */
import { useState } from 'react';

// components
import Autocomplete from 'components/form/Autocomplete';

// mui
import { Button, Popover, makeStyles } from '@material-ui/core';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';
import type { Tribe } from 'types/tribe';
import type { Channel } from 'types/channel';

const useStyles = makeStyles(() => ({
  paper: () => ({
    height: '292px',
    padding: '1.6rem',
    boxShadow: '-20px 0px 40px rgb(51 51 51 / 10%)',
    borderRadius: '1.6rem',
  }),
}));

export interface Props extends InputProps {
  apiString: string;
  // we can update this type to allow something like Tribe | Channel | User etc.
  defaultValue: Tribe | Channel;
  endAdornment?: React.ReactNode | null;
  errors?: FieldErrors;
  label?: string;
  name: string;
  OptionComponent: React.ComponentType<any>;
  spacing?: string;
}

const AutocompleteSelect = ({
  apiString,
  defaultValue,
  endAdornment,
  errors,
  name,
  OptionComponent,
  spacing = '0',
  ...rest
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'select' : undefined;
  const [selectLabel, setSelectLabel] = useState<Tribe | Channel>(defaultValue);

  return (
    <div>
      <Button
        aria-describedby={id}
        color="primary"
        variant="contained"
        onClick={handleClick}
      >
        {selectLabel?.name}
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.paper }}
        id={id}
        open={open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
      >
        <Autocomplete
          OptionComponent={OptionComponent}
          apiString={apiString}
          defaultValue={defaultValue}
          endAdornment={endAdornment}
          errors={errors}
          getCurrentValue={setSelectLabel}
          name={name}
          spacing={spacing}
          {...rest}
        />
      </Popover>
    </div>
  );
};

export default AutocompleteSelect;
