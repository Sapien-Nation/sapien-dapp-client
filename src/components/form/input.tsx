import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// styles
import { red, error } from 'styles/colors';

// mui
import { Box, FormControl, Input as MuiInput, InputLabel } from '@material-ui/core';

//components
import ChartCount from 'components/form/ChartCount';
import FormErrors from 'components/form/FormErrors';

export interface Props {
  chartCount?: boolean;
  fullWidth?: boolean;
  label: string;
  maxLength?: number;
  name: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  rowsMax?: number;
}

const Input: React.FC<Props> = ({
  chartCount = false,
  fullWidth = true,
  label,
  maxLength = 36,
  name,
  placeholder,
  required = false,
  multiline = false,
  rows = 3,
  rowsMax = 5
}) => {
  const { register, formState } = useFormContext();
  const [errors, setErrors] = useState<null | any>(null);

  useEffect(() => {
    if (formState.errors) {
      setErrors(formState.errors);
    }
  }, [formState]);
  return (
    <>
      <FormControl fullWidth={fullWidth} required={required}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={1}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          {chartCount ? (
            <ChartCount field={name} maxCount={maxLength.toString()} />
          ) : null}
        </Box>
        <MuiInput
          fullWidth={fullWidth}
          id={name}
          inputRef={register({ required, maxLength: maxLength })}
          multiline={multiline}
          name={name}
          placeholder={placeholder}
          rows={rows}
          rowsMax={rowsMax}
          style={{
            backgroundColor: errors && Object.keys(errors).length ? error : null,
            borderColor: errors && Object.keys(errors).length ? red : null
          }}
        />
      </FormControl>
      <FormErrors name={errors && errors[name] && errors[name].type} />
    </>
  );
};

export default Input;
