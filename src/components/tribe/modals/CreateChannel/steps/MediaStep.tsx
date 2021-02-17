// mui
import {
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';

// assets
import { AddIcon } from 'components/assets/svg';

// styles
import { background, lightGrey } from 'styles/colors';

// components
import DropZone from 'components/dropzone';

const useStyles = makeStyles(() => ({
  dropzone: {
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    margin: '1.6rem 0'
  },
  avatar: {
    width: '6.4rem',
    height: '6.4rem'
  },
  cover: {
    width: '100%',
    height: '10rem'
  }
}));

const MediaStep = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="description">Avatar</InputLabel>
        <DropZone
          accept="image/*"
          className={`${classes.dropzone} ${classes.avatar}`}
          maxFiles={1}
          maxSize={20971520}
          name="avatar"
          render={() => {
            return (
              <IconButton
                aria-label="channel type"
                style={{ color: theme.palette.infoIcon.main }}
              >
                <AddIcon />
              </IconButton>
            );
          }}
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
        <InputLabel htmlFor="description">Cover image</InputLabel>
        <DropZone
          accept="image/*"
          className={`${classes.dropzone} ${classes.cover}`}
          maxFiles={1}
          maxSize={41943040}
          name="cover"
          render={() => {
            return (
              <IconButton
                aria-label="channel type"
                style={{ color: theme.palette.infoIcon.main }}
              >
                <AddIcon />
              </IconButton>
            );
          }}
        />
        <Typography variant="caption">
          Drag and Drop or{' '}
          <Typography color="primary" variant="caption">
            Browse{' '}
          </Typography>
          to upload image (max 40MB)
        </Typography>
      </FormControl>
    </>
  );
};

export default MediaStep;
