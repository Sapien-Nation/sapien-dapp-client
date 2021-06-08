import { Editor, EditorState } from 'draft-js';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

// components
import FilesPreview from './FilesPreview';

// icons
import {
  EmojiEmotionsOutlined,
  MusicNote,
  PanoramaOutlined,
} from '@material-ui/icons';

// mui
import { Avatar, Box, Button, Divider, Typography } from '@material-ui/core';

// types
import type { EditorState as EditorStateType } from 'draft-js';

interface FormValues {
  audios?: Array<File>;
  editorState: EditorStateType;
  images?: Array<File>;
}

interface Props {
  user: { avatar: string; username: string };
}

const CreatePostForm = ({ user }: Props) => {
  const audioRef = useRef(null);
  const imagesRef = useRef(null);

  const { control, getValues, handleSubmit, setValue, watch } =
    useForm<FormValues>({
      defaultValues: {
        audios: [],
        editorState: EditorState.createEmpty(),
        images: [],
      },
    });

  const onSubmit = (values: FormValues) => console.log(values);

  const [audios, images] = watch(['audios', 'images']);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>JD</Avatar>
        <Controller
          control={control}
          name="editorState"
          render={({ field: { value, ...rest } }) => (
            <Box style={{ width: '100%', minWidth: 680 }}>
              <Editor
                {...rest}
                editorState={value}
                placeholder={`What’s on your mind, ${user.username}?`}
              />
            </Box>
          )}
        />
      </Box>
      <Box display="flex" gap={1.5} margin={2}>
        <FilesPreview
          files={audios}
          onRemove={(newFiles) => setValue('audios', newFiles)}
        />
        <FilesPreview
          files={images}
          onRemove={(newFiles) => setValue('images', newFiles)}
        />
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-around"
        paddingX={10}
        paddingY={2}
      >
        <Button
          aria-controls="emoji-menu"
          aria-haspopup="true"
          startIcon={<EmojiEmotionsOutlined />}
          variant="text"
        >
          <Typography variant="button">
            Emotion
          </Typography>
        </Button>
        <Button
          aria-label="Add Photo or Video"
          startIcon={<PanoramaOutlined />}
          variant="text"
          onClick={() => {
            imagesRef.current.click();
          }}
        >
          <Typography variant="button">
            Photo/Video
          </Typography>
        </Button>
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange } }) => {
            return (
              <input
                ref={imagesRef}
                hidden
                multiple
                accept="image/*, video/*"
                id="create-post-form-image-input"
                type="file"
                onChange={(event) => {
                  onChange([...getValues('images'), ...event.target.files]);
                }}
              />
            );
          }}
        />

        <Button
          aria-label="Add Recording or Music"
          startIcon={<MusicNote />}
          variant="text"
          onClick={() => {
            audioRef.current.click();
          }}
        >
          <Typography variant="button">
            Recording/Music
          </Typography>
        </Button>
      </Box>
      <Controller
        control={control}
        name="audios"
        render={({ field: { onChange } }) => {
          return (
            <input
              ref={audioRef}
              hidden
              multiple
              accept="audio/mp3,audio/*;capture=microphone"
              id="create-post-form-audio-input"
              type="file"
              onChange={(event) => {
                onChange([...getValues('audios'), ...event.target.files]);
              }}
            />
          );
        }}
      />
    </form>
  );
};

export default CreatePostForm;
