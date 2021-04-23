import { useSnackbar } from 'notistack';
import { useForm, useWatch } from 'react-hook-form';

// types
import type { Channel } from 'tools/types/channel';
import type { Theme } from '@material-ui/core';

// api
import axios from 'api';

// mui
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';

// assets
import { AddIcon } from 'components/common/assets/svg';

// styles
import { black, background, lightGrey, white } from 'styles/colors';

//components
import { Dropzone, TextInput } from 'components/common';

const useStyles = makeStyles((theme: Theme) => ({
  dropzone: {
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    margin: '1.6rem 0',
    '&:focus': {
      outline: 'none',
    },
  },
  avatar: {
    width: '6.4rem',
    height: '6.4rem',
  },
  cover: {
    width: '100%',
    height: '10rem',
  },
  delete: {
    display: 'block',
    padding: 0,
    '&:hover': {
      background: 'none',
    },
  },
  addIcon: {
    background: white,
    padding: theme.spacing(0.5),
    opacity: '0.5',
    color: black,
  },
}));

interface Props {
  formKey: string;
  channel: Channel;
  onClose: () => void;
}

const Settings = ({ channel, formKey, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    unregister,
    watch,
  } = useForm({
    defaultValues: {
      image: channel.image,
      cover: channel.cover,
      description: channel.description,
      name: channel.name,
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { ref: nameRef, ...nameRest } = register('name', {
    required: 'Name is required',
    validate: {
      maxLength: (val = '') => val.length <= 36 || 'Name is too long',
    },
  });
  const { ref: descriptionRef, ...descriptionRest } = register('description', {
    required: 'Description is required',
    validate: {
      maxLength: (val = '') => val.length <= 60 || 'Description is too long',
    },
  });
  const currentName = useWatch({
    control,
    name: 'name',
  });
  const currentDescription = useWatch({
    control,
    name: 'description',
  });

  const handleDelete = async () => {
    try {
      await axios.put('/api/channels/details', {
        channelID: channel.id,
      });
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  const onSubmit = async (values) => {
    try {
      await axios.put('/api/channels/details', {
        channelID: channel.id,
        ...values,
      });
      enqueueSnackbar('Channel edited successfully!');
      onClose();
    } catch ({ response }) {
      enqueueSnackbar(response.data.message);
    }
  };

  return (
    <form id={formKey} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        fullWidth
        chartCount="36"
        currentChartCount={currentName?.length}
        errors={errors}
        inputRef={nameRef}
        label="Name"
        name="name"
        placeholder="Name"
        {...nameRest}
      />
      <TextInput
        fullWidth
        multiline
        chartCount="60"
        currentChartCount={currentDescription?.length}
        errors={errors}
        inputRef={descriptionRef}
        label="Description"
        maxRows={5}
        minRows={3}
        name="description"
        placeholder="Set brief description"
        {...descriptionRest}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="image">Avatar</InputLabel>
        <Dropzone
          accept="image/*"
          className={`${classes.dropzone} ${classes.avatar}`}
          errors={errors}
          maxFiles={1}
          maxSize={20971520}
          name="image"
          register={register}
          render={() => {
            return (
              <IconButton className={classes.addIcon}>
                <AddIcon />
              </IconButton>
            );
          }}
          setValue={setValue}
          unregister={unregister}
          watch={watch}
        />
        <Typography variant="caption">
          Drag and Drop or{' '}
          <Typography color="primary" variant="caption">
            Browse{' '}
          </Typography>
          to upload image (max 20MB)
        </Typography>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="cover">Cover image</InputLabel>
        <Dropzone
          accept="image/*"
          className={`${classes.dropzone} ${classes.cover}`}
          errors={errors}
          maxFiles={1}
          maxSize={41943040}
          name="cover"
          register={register}
          render={() => {
            return (
              <IconButton className={classes.addIcon}>
                <AddIcon />
              </IconButton>
            );
          }}
          setValue={setValue}
          unregister={unregister}
          watch={watch}
        />
        <Typography variant="caption">
          Drag and Drop or{' '}
          <Typography color="primary" variant="caption">
            Browse{' '}
          </Typography>
          to upload image (max 40MB)
        </Typography>
      </FormControl>
      <Button
        className={classes.delete}
        color="secondary"
        onClick={handleDelete}
      >
        Delete Channel
      </Button>
      <Typography style={{ fontSize: '1.2rem' }} variant="caption">
        When you delete your channel all published content will be deleted
        unless it is migrated
      </Typography>
    </form>
  );
};

export default Settings;
