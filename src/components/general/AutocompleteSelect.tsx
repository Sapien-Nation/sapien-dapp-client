/* istanbul ignore file */
import { useState, Dispatch, SetStateAction } from 'react';

// components
import Autocomplete from 'components/form/Autocomplete';

// mui
import { Button, Popover, makeStyles } from '@material-ui/core';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  paper: () => ({
    height: '292px',
    padding: '1.6rem',
    boxShadow: '-20px 0px 40px rgb(51 51 51 / 10%)',
    borderRadius: '1.6rem',
  }),
}));

export interface Props extends InputProps {
  defaultValue: any;
  endAdornment?: React.ReactNode | null;
  errors?: FieldErrors;
  label?: string;
  loading: boolean;
  name: string;
  open: boolean;
  OptionComponent: React.ComponentType<any>;
  options: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  spacing?: string;
}

const AutocompleteSelect = ({
  defaultValue,
  endAdornment,
  errors,
  loading,
  name,
  open,
  OptionComponent,
  options,
  setOpen,
  spacing = '0',
  ...rest
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'select' : undefined;
  const [selectLabel, setSelectLabel] = useState<any>(defaultValue);

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
          defaultValue={defaultValue}
          endAdornment={endAdornment}
          errors={errors}
          getCurrentValue={setSelectLabel}
          loading={loading}
          name={name}
          open={open}
          options={options}
          setOpen={setOpen}
          spacing={spacing}
          {...rest}
        />
      </Popover>
    </div>
  );
};

export default AutocompleteSelect;
