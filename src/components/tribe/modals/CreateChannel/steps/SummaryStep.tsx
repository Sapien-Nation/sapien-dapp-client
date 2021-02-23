import { useFormContext } from 'react-hook-form';

// mui
import { Box, FormControl, Input, InputLabel, useTheme } from '@material-ui/core';

//components
import { ChartCount, PasswordInput } from 'components/form';

const SummaryStep = () => {
  const { register } = useFormContext();
  const theme = useTheme();

  return (
    <>
      <PasswordInput
        label="Hello"
        name="password"
        tooltipText="Minimum length is 8 characters, Must include at least 1 alpha, 1 numeric, 1 lowercase and 1 uppercase"
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
