import { useFormContext } from 'react-hook-form';

// mui
import {
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

// styles
import { background, lightGrey } from 'styles/colors';

//components
import { Dropzone } from 'components/form';

const useStyles = makeStyles(() => ({
  dropzone: () => ({
    background: background,
    border: `1px dashed ${lightGrey}`,
    borderRadius: `1.6rem`,
    cursor: 'pointer',
    margin: '1.6rem 0',
  }),
  avatar: {
    width: '6.4rem',
    height: '6.4rem',
  },
  cover: {
    width: '100%',
    height: '10rem',
  },
}));

const MediaStep = () => {
  const classes = useStyles();
  const theme = useTheme();
  const {
    formState: { errors },
    register,
    unregister,
    setValue,
    watch,
  } = useFormContext();

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="avatar">Avatar</InputLabel>
        <Dropzone
          accept="image/*"
          className={`${classes.dropzone} ${classes.avatar}`}
          errors={errors}
          maxFiles={1}
          maxSize={20971520}
          name="avatar"
          register={register}
          render={() => {
            return (
              <IconButton
                style={{ color: (theme as any).palette.infoIcon.main }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            );
          }}
          rules={{ required: 'Avatar is required' }}
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
              <IconButton
                style={{ color: (theme as any).palette.infoIcon.main }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            );
          }}
          rules={{ required: 'Cover is required' }}
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
    </>
  );
};

export default MediaStep;