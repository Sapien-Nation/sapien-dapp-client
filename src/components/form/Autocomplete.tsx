import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ErrorMessage } from '@hookform/error-message';

// api
import axios from 'api';

// types
import type { FieldErrors } from 'react-hook-form';
import type { InputProps } from '@material-ui/core';
import type { Tribe } from 'types/tribe';
import type { Channel } from 'types/channel';

// mui
import {
  Box,
  Input as MuiInput,
  InputLabel,
  Typography,
  makeStyles,
} from '@material-ui/core';
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
  apiString: string;
  // we can update this type to allow something like Tribe | Channel | User etc.
  defaultValue: Tribe | Channel;
  endAdornment?: React.ReactNode | null;
  errors?: FieldErrors;
  getCurrentValue: Dispatch<SetStateAction<Tribe | Channel>>;
  label?: string;
  name: string;
  OptionComponent: React.ComponentType<any>;
  spacing?: string;
}

const Autocomplete = ({
  apiString,
  defaultValue,
  endAdornment,
  errors,
  getCurrentValue,
  label,
  name,
  OptionComponent,
  spacing = '0',
  ...rest
}: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Tribe[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const {
        data: { tribes },
      } = await axios.get(`/api/${apiString}`);
      if (active) {
        setOptions(tribes);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    (async () => {
      const {
        data: { tribes },
      } = await axios.get(`/api/${apiString}`);
      setOptions(tribes);
      setOpen(true);
    })();
  }, []);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <MuiAutocomplete
      disablePortal
      classes={{
        paper: classes.paper,
        popper: classes.popper,
        option: classes.option,
      }}
      defaultValue={defaultValue}
      getOptionLabel={(option: Tribe) => option.name}
      getOptionSelected={(option: Tribe, value: Tribe) =>
        option.name === value.name
      }
      id={name}
      loading={loading}
      open={open}
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} style={{ marginBottom: spacing }}>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box alignItems="center" display="flex">
              <InputLabel {...params.InputLabelProps} htmlFor={name}>
                {label}
              </InputLabel>
            </Box>
          </Box>
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
      onChange={(_, value: Tribe) => getCurrentValue(value)}
      onOpen={() => {
        setOpen(true);
      }}
    />
  );
};

export default Autocomplete;
