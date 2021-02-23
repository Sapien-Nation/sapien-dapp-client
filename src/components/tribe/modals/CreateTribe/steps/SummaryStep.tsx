import { Controller, useFormContext } from 'react-hook-form';

// mui
import {
  Box,
  FormControl,
  Input,
  IconButton,
  InputLabel,
  InputAdornment,
  Switch,
  useTheme,
  Typography,
} from '@material-ui/core';
import { HelpOutlineOutlined as HelpIcon } from '@material-ui/icons';

const getChartCount = (field: string, maxCount: string) => {
  const { watch } = useFormContext();

  const val = watch(field) as string;
  return (
    <Typography data-testid="chart-count" variant="caption">
      {val?.length || 0} / {maxCount}
    </Typography>
  );
};

const SummaryStep = () => {
  const { control, register } = useFormContext();
  const theme = useTheme();

  return (
    <>
      <FormControl fullWidth required>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={1}
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          {getChartCount('name', '36')}
        </Box>
        <Input
          fullWidth
          id="name"
          inputRef={register({ required: true, maxLength: 36 })}
          name="name"
          placeholder="Name"
        />
      </FormControl>
      <FormControl fullWidth required>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={1.6}
        >
          <InputLabel htmlFor="unique_identifier">Unique Identifier</InputLabel>
          {getChartCount('unique_identifier', '15')}
        </Box>
        <Input
          fullWidth
          id="unique_identifier"
          inputRef={register({ required: true, maxLength: 15 })}
          name="unique_identifier"
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: theme.spacing(0.5) }}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={1.6}
        >
          <InputLabel htmlFor="description">Description</InputLabel>
          {getChartCount('description', '60')}
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
      <Controller
        control={control}
        name="public"
        render={(props) => (
          <FormControl fullWidth>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <InputLabel htmlFor="unique_identifier">
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box component="span">Public tribe</Box>
                  <IconButton
                    aria-label="tribe type"
                    style={{ color: theme.palette.infoIcon.main }}
                  >
                    <HelpIcon fontSize="small" />
                  </IconButton>
                </Box>
              </InputLabel>
              <Switch
                disableRipple
                checked={props.value}
                color="default"
                inputProps={{ 'aria-label': 'Tribe Type' }}
                onChange={(e) => {
                  props.onChange(e.target.checked);
                }}
              />
            </Box>
          </FormControl>
        )}
      />
    </>
  );
};

export default SummaryStep;
