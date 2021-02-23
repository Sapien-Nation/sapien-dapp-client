import { Controller, useFormContext } from 'react-hook-form';

// mui
import { Box, FormControl, Input, InputLabel, useTheme } from '@material-ui/core';

//components
import { ChartCount, PasswordStrengthInput, PasswordInput } from 'components/form';

const SummaryStep = () => {
  const { control, getValues, register } = useFormContext();
  const theme = useTheme();

  return (
    <>
      <PasswordStrengthInput
        label="Password"
        name="password"
        tooltipText="Minimum length is 8 characters, Must include at least 1 alpha, 1 numeric, 1 lowercase and 1 uppercase"
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ onChange, name, value }) => (
          <PasswordInput
            inputRef={register({
              validate: (value) => {
                console.log('entro?');
                return (
                  value === getValues('password') || 'The passwords do not match'
                );
              }
            })}
            label="Confirm Password"
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <FormControl fullWidth style={{ marginBottom: theme.spacing(0.5) }}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={1.6}
        >
          <InputLabel htmlFor="description">Description</InputLabel>
          <ChartCount maxCount="60" name="description" />
        </Box>
        <Input
          fullWidth
          multiline
          id="description"
          inputRef={register({ required: true, maxLength: 60 })}
          name="description"
          placeholder="Set brief description"
          rows={3}
          rowsMax={5}
        />
      </FormControl>
    </>
  );
};

export default SummaryStep;
