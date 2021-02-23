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

const Input = ({
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
}: Props) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const errorState = errors[name];

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
          {chartCount && <ChartCount field={name} maxCount={maxLength.toString()} />}
        </Box>
        <MuiInput
          fullWidth={fullWidth}
          id={name}
          inputRef={register({ required, maxLength })}
          multiline={multiline}
          name={name}
          placeholder={placeholder}
          rows={rows}
          rowsMax={rowsMax}
          style={{
            backgroundColor: Object.keys(errorState || []).length ? error : null,
            borderColor: Object.keys(errorState || []).length ? red : null
          }}
        />
      </FormControl>
      <FormErrors type={errorState?.type ?? ''} />
    </>
  );
};

export default Input;
