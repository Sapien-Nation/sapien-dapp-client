import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

// types
import type { Channel } from 'tools/types/channel';
import type { Theme } from '@material-ui/core/styles';
import type { Rss } from 'tools/types/rss';

// api
import axios from 'api';

// utils
import { isUrl } from 'utils/url';

// assets
import { RssIcon, DeleteIcon } from 'components/assets/svg';

// styles
import { background, purple } from 'styles/colors';

// mui
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';

//components
import { TextInput } from 'components/form';

const useStyles = makeStyles((theme: Theme) => ({
  removeRssButton: {
    padding: `${theme.spacing(0.6)}`,
    marginLeft: `${theme.spacing(1)}`,
    backgroundColor: 'none',
  },
}));

interface Props {
  channel: Channel;
  formKey: string;
  onClose: () => void;
}

const RSS = ({ channel, formKey, onClose }: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      url: '',
      rss: channel.rss,
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'rss',
  });
  const classes = useStyles();

  const { ref, ...rest } = register('url');

  const url = useWatch({
    control,
    name: 'url',
  });

  const addFeed = () => {
    if (isUrl(url)) {
      append({ id: String(fields.length + 1), name: url });
      clearErrors();
      setValue('url', '');
    } else {
      setError('url', { message: 'Please enter a valid url' });
    }
  };

  useEffect(() => {
    if (!fields.length) {
      setShowInput(true);
    }
  }, [fields, setShowInput]);

  const onSubmit = async ({ rss }) => {
    try {
      await axios.put('/api/channels/details', {
        channelID: channel.id,
        rss,
      });
      enqueueSnackbar('Channel edited successfully!');
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <form noValidate id={formKey} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field: Rss, index: number) => {
        return (
          <Box
            key={field.id}
            alignItems="center"
            bgcolor={background}
            borderRadius={1}
            display="flex"
            justifyContent="space-between"
            marginBottom={1.5}
            paddingX={1.6}
            paddingY={1.3}
            width="100%"
          >
            <Box alignItems="center" display="flex">
              <RssIcon />
              <Typography style={{ marginLeft: '1rem ' }}>
                {field.name}
              </Typography>
            </Box>
            <IconButton
              aria-label="remove rss"
              classes={{
                root: classes.removeRssButton,
              }}
              onClick={() => remove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}

      {showInput && (
        <>
          <TextInput
            fullWidth
            autoComplete="label"
            errors={errors}
            inputRef={ref}
            label="URL"
            name="url"
            placeholder="https://"
            spacing="1rem"
            type="url"
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                addFeed();
              }
            }}
            {...rest}
          />
          <Box marginTop={1.5}>
            <Typography variant="caption">
              Enter a URL or{' '}
              <Typography color="primary" variant="caption">
                Browse{' '}
              </Typography>
              to import RSS feeds (max 150MB)
            </Typography>
          </Box>
        </>
      )}

      <Box marginBottom={2} marginTop={2} width="100%">
        <Button
          style={{
            color: purple,
          }}
          onClick={() => {
            if (url) {
              addFeed();
            }
            setShowInput(true);
          }}
        >
          + Add More
        </Button>
      </Box>
    </form>
  );
};

export default RSS;
