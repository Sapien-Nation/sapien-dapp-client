import { useFormContext } from 'react-hook-form';

// types
import type { Theme } from '@material-ui/core/styles';

// assets
import { AddIcon, RssIcon } from 'components/assets/svg';

// styles
import { background, darkGrey, purple } from 'styles/colors';

// mui
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';

//components
import { TextInput } from 'components/form';

const useStyles = makeStyles((theme: Theme) => ({
  addRssButton: {
    padding: `${theme.spacing(0.6)}`,
    marginLeft: `${theme.spacing(1)}`,
    backgroundColor: `${darkGrey}15`,
  },
}));

const RSSStep = () => {
  const { errors, register } = useFormContext();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <TextInput
        fullWidth
        autoComplete="label"
        chartCount="36"
        errors={errors}
        inputRef={register({ required: 'Label is required', maxLength: 36 })}
        label="Label"
        name="label"
        placeholder="Label"
        spacing="1rem"
      />
      <Typography style={{ marginTop: theme.spacing(1.5) }} variant="caption">
        Enter a URL or{' '}
        <Typography color="primary" variant="caption">
          Browse{' '}
        </Typography>
        to import RSS feeds (max 150MB)
      </Typography>
      <Box marginBottom="2rem" width="100%">
        <Button
          style={{
            color: purple,
            marginTop: theme.spacing(2),
          }}
        >
          + Add More
        </Button>
      </Box>
      {/* <FormControl fullWidth>
        <InputLabel htmlFor="label">Label</InputLabel>
        <Input
          fullWidth
          id="label"
          inputRef={register({ required: false, maxLength: 36 })}
          name="label"
          placeholder="https://"
        />
        <Typography style={{ marginTop: theme.spacing(1.5) }} variant="caption">
          Enter a URL or{' '}
          <Typography color="primary" variant="caption">
            Browse{' '}
          </Typography>
          to import RSS feeds (max 150MB)
        </Typography>
        <Box width="100%">
          <Button
            style={{
              color: purple,
              marginTop: theme.spacing(2),
            }}
          >
            + Add More
          </Button>
        </Box>
      </FormControl> */}
      <Typography style={{ marginBottom: '2.2rem' }} variant="h5">
        Popular Feeds
      </Typography>
      <Box
        alignItems="center"
        bgcolor={background}
        borderRadius="1rem"
        display="flex"
        justifyContent="space-between"
        padding="1.3rem 1.6rem"
        width="100%"
      >
        <Box alignItems="center" display="flex">
          <RssIcon />
          <Typography style={{ marginLeft: '1rem ', fontWeight: 600 }}>
            Foodies Feed
          </Typography>
        </Box>
        <IconButton
          aria-label="add rss"
          classes={{
            root: classes.addRssButton,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default RSSStep;
