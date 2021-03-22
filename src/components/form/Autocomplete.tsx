import { Dispatch, SetStateAction } from 'react';
import { ErrorMessage } from '@hookform/error-message';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';

// mui
import { Input as MuiInput, Typography, makeStyles } from '@material-ui/core';
import { Autocomplete as MuiAutocomplete } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  image: () => ({
    height: '4rem',
    width: '4rem',
    borderRadius: '5px',
  }),
  paper: () => ({
    margin: '0',
    boxShadow: 'none',
  }),
  popper: () => ({
    height: '29.2 rem',
  }),
  option: () => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: 0,
    paddingRight: 0,
    '&[data-focus="true"], &[data-selected="true"]': {
      backgroundColor: 'transparent',
    },
  }),
}));

export interface Props extends InputProps {
  defaultValue: any;
  endAdornment?: React.ReactNode | null;
  errors?: FieldErrors;
  getCurrentValue: Dispatch<SetStateAction<any>>;
  label?: string;
  loading: boolean;
  name: string;
  open: boolean;
  OptionComponent: React.ComponentType<any>;
  options: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  spacing?: string;
}

const Autocomplete = ({
  defaultValue,
  endAdornment,
  errors,
  getCurrentValue,
  label,
  loading,
  name,
  open,
  OptionComponent,
  options,
  setOpen,
  spacing = '0',
  ...rest
}: Props) => {
  const classes = useStyles();

  return (
    <MuiAutocomplete
      disablePortal
      classes={{
        paper: classes.paper,
        popper: classes.popper,
        option: classes.option,
      }}
      defaultValue={defaultValue}
      getOptionLabel={(option: any) => option.name}
      getOptionSelected={(option: any, value: any) =>
        option.name === value.name
      }
      id={name}
      loading={loading}
      open={open}
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} style={{ marginBottom: spacing }}>
          <MuiInput
            id={name}
            name={name}
            {...params.inputProps}
            endAdornment={endAdornment}
            style={{ width: '100%', borderRadius: '0.8rem' }}
            {...rest}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <Typography
                color="secondary"
                role="alert"
                style={{
                  textAlign: 'right',
                }}
                variant="subtitle1"
              >
                {message}
              </Typography>
            )}
          />
        </div>
      )}
      renderOption={(option) => <OptionComponent option={option} />}
      style={{ width: 271 }}
      onChange={(_, value: any) => getCurrentValue(value)}
      onOpen={() => {
        setOpen(true);
      }}
    />
  );
};

export default Autocomplete;
